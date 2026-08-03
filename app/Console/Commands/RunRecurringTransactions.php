<?php

namespace App\Console\Commands;

use App\Services\RecurringRunner;
use Illuminate\Console\Command;

class RunRecurringTransactions extends Command
{
    protected $signature = 'recurring:run {--date= : Process as of this date (Y-m-d)}';

    protected $description = 'Post due recurring transactions and advance next_run dates';

    public function handle(RecurringRunner $runner): int
    {
        $date = $this->option('date')
            ? \Illuminate\Support\Carbon::parse($this->option('date'))
            : now();

        $count = $runner->run($date);

        $this->info("Posted {$count} recurring transaction(s).");

        return self::SUCCESS;
    }
}
