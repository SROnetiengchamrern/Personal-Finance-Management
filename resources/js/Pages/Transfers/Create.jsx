import EmptyState from '@/Components/EmptyState';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import {
    currencyLabel,
    formatDate,
    formatMoney,
    walletDisplayName,
    walletOptionLabel,
} from '@/lib/format';
import { Head, Link, router, useForm } from '@inertiajs/react';

export function Index({ transfers }) {
    const { t } = useTranslation();
    const rows = transfers.data || [];
    const walletLookup = rows.flatMap((item) => [item.from_wallet, item.to_wallet]).filter(Boolean);

    return (
        <AppLayout title={t('transfers.title')}>
            <Head title={t('transfers.title')} />
            <PageHeader
                title={t('transfers.title')}
                subtitle={t('transfers.subtitle')}
                actionLabel={t('transfers.add')}
                actionHref={route('transfers.create')}
            />

            {rows.length === 0 ? (
                <EmptyState
                    title={t('transfers.empty_title')}
                    description={t('transfers.empty_desc')}
                    actionLabel={t('transfers.add')}
                    actionHref={route('transfers.create')}
                />
            ) : (
                <div className="fh-card overflow-hidden">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                            <tr>
                                <th className="px-4 py-3">{t('common.date')}</th>
                                <th className="px-4 py-3">{t('transfers.from')}</th>
                                <th className="px-4 py-3">{t('transfers.to')}</th>
                                <th className="px-4 py-3">{t('common.note')}</th>
                                <th className="px-4 py-3 text-right">{t('common.amount')}</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--fh-border)]">
                            {rows.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3">{formatDate(item.transfer_date)}</td>
                                    <td className="px-4 py-3">
                                        {walletDisplayName(item.from_wallet, walletLookup)}
                                        <span className="ml-1 text-xs text-[var(--fh-muted)]">
                                            ({item.from_wallet?.currency})
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        {walletDisplayName(item.to_wallet, walletLookup)}
                                        <span className="ml-1 text-xs text-[var(--fh-muted)]">
                                            ({item.to_wallet?.currency})
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{item.note || '—'}</td>
                                    <td className="px-4 py-3 text-right font-bold">
                                        {formatMoney(item.amount, item.from_wallet?.currency || 'USD')}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            type="button"
                                            className="text-rose-700 hover:underline"
                                            onClick={() => {
                                                if (confirm(t('transfers.reverse_confirm'))) {
                                                    router.delete(route('transfers.destroy', item.id));
                                                }
                                            }}
                                        >
                                            {t('transfers.reverse')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AppLayout>
    );
}

export default function Create({ wallets }) {
    const { t } = useTranslation();
    const form = useForm({
        from_wallet_id: wallets[0]?.id || '',
        to_wallet_id: wallets[1]?.id || wallets[0]?.id || '',
        amount: '',
        note: '',
        transfer_date: new Date().toISOString().slice(0, 10),
    });

    const fromWallet = wallets.find((w) => String(w.id) === String(form.data.from_wallet_id));
    const toWallet = wallets.find((w) => String(w.id) === String(form.data.to_wallet_id));
    const fromCurrency = fromWallet?.currency || 'USD';
    const toCurrency = toWallet?.currency || 'USD';
    const sameCurrency = String(fromCurrency).toUpperCase() === String(toCurrency).toUpperCase();

    return (
        <AppLayout title={t('transfers.create_title')}>
            <Head title={t('transfers.create_title')} />
            <PageHeader title={t('transfers.create_title')} subtitle={t('transfers.create_subtitle')} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('transfers.store'));
                }}
                className="fh-card mx-auto max-w-2xl space-y-5 p-6"
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('transfers.from_wallet')} />
                        <select
                            className="fh-input mt-1"
                            value={form.data.from_wallet_id}
                            onChange={(e) => form.setData('from_wallet_id', e.target.value)}
                        >
                            {wallets.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {walletOptionLabel(w, wallets)}
                                </option>
                            ))}
                        </select>
                        <InputError message={form.errors.from_wallet_id} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel value={t('transfers.to_wallet')} />
                        <select
                            className="fh-input mt-1"
                            value={form.data.to_wallet_id}
                            onChange={(e) => form.setData('to_wallet_id', e.target.value)}
                        >
                            {wallets.map((w) => (
                                <option key={w.id} value={w.id}>
                                    {walletOptionLabel(w, wallets)}
                                </option>
                            ))}
                        </select>
                        <InputError message={form.errors.to_wallet_id} className="mt-1" />
                    </div>
                </div>

                <div>
                    <InputLabel value={t('transfers.amount_label', { label: currencyLabel(fromCurrency), code: fromCurrency })} />
                    <div className="relative mt-1">
                        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-semibold text-[var(--fh-muted)]">
                            {fromCurrency}
                        </span>
                        <TextInput
                            type="number"
                            step="0.01"
                            min="0.01"
                            className="fh-input block w-full pl-14"
                            value={form.data.amount}
                            onChange={(e) => form.setData('amount', e.target.value)}
                            required
                        />
                    </div>
                    <p className="mt-1 text-xs text-[var(--fh-muted)]">
                        {t('transfers.amount_hint', {
                            currency: currencyLabel(fromCurrency),
                            wallet: walletDisplayName(fromWallet || {}, wallets),
                        })}
                    </p>
                    <InputError message={form.errors.amount} className="mt-1" />
                </div>

                {!sameCurrency && fromWallet && toWallet && (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        {t('transfers.convert_hint', {
                            from: fromCurrency,
                            to: toCurrency,
                            wallet: walletDisplayName(toWallet, wallets),
                        })}
                    </div>
                )}

                <div>
                    <InputLabel value={t('common.date')} />
                    <TextInput
                        type="date"
                        className="fh-input mt-1 block w-full"
                        value={form.data.transfer_date}
                        onChange={(e) => form.setData('transfer_date', e.target.value)}
                        required
                    />
                </div>
                <div>
                    <InputLabel value={t('common.note')} />
                    <textarea
                        className="fh-input mt-1"
                        rows="3"
                        value={form.data.note}
                        onChange={(e) => form.setData('note', e.target.value)}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Link href={route('transfers.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                    <button className="fh-btn-primary" disabled={form.processing}>{t('transfers.submit')}</button>
                </div>
            </form>
        </AppLayout>
    );
}
