<?php

namespace App\Services;

use App\Models\AppNotification;
use App\Models\RecurringTransaction;
use App\Models\Setting;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class RecurringRunner
{
    public function run(?Carbon $asOf = null): int
    {
        $asOf = ($asOf ?? now())->startOfDay();
        $processed = 0;

        RecurringTransaction::query()
            ->with('wallet')
            ->where('status', 'active')
            ->whereDate('next_run', '<=', $asOf->toDateString())
            ->orderBy('id')
            ->chunkById(50, function ($items) use ($asOf, &$processed) {
                foreach ($items as $item) {
                    while ($item->status === 'active' && $item->next_run && $item->next_run->lte($asOf)) {
                        $this->postOnce($item);
                        $processed++;

                        $item->next_run = $this->advanceDate($item->next_run->copy(), $item->frequency);
                        $item->save();
                    }
                }
            });

        return $processed;
    }

    private function postOnce(RecurringTransaction $item): void
    {
        DB::transaction(function () use ($item) {
            $transaction = Transaction::create([
                'user_id' => $item->user_id,
                'wallet_id' => $item->wallet_id,
                'category_id' => $item->category_id,
                'type' => $item->type,
                'amount' => $item->amount,
                'note' => $item->title.' (recurring)',
                'transaction_date' => $item->next_run->toDateString(),
            ]);

            $wallet = Wallet::find($item->wallet_id);
            if ($wallet) {
                $delta = $item->type === 'income'
                    ? (float) $item->amount
                    : -(float) $item->amount;
                $wallet->increment('balance', $delta);
            }

            $this->notifyIfEnabled($item, $transaction);
        });
    }

    private function advanceDate(Carbon $date, string $frequency): Carbon
    {
        return match ($frequency) {
            'daily' => $date->addDay(),
            'weekly' => $date->addWeek(),
            'yearly' => $date->addYear(),
            default => $date->addMonth(),
        };
    }

    private function notifyIfEnabled(RecurringTransaction $item, Transaction $transaction): void
    {
        $settings = Setting::where('user_id', $item->user_id)->first();
        if ($settings && ! $settings->notification) {
            return;
        }

        AppNotification::create([
            'user_id' => $item->user_id,
            'title' => 'Recurring transaction posted',
            'message' => sprintf(
                '%s (%s) of %s was posted to your wallet.',
                $item->title,
                $item->type,
                number_format((float) $transaction->amount, 2)
            ),
            'is_read' => false,
        ]);
    }
}
