import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatMoney } from '@/lib/format';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ transactions, filters, wallets }) {
    const { t } = useTranslation();
    const rows = transactions.data || [];

    return (
        <AppLayout title={t('transactions.title')}>
            <Head title={t('transactions.title')} />
            <PageHeader
                title={t('transactions.title')}
                subtitle={t('transactions.subtitle')}
                actionLabel={t('transactions.add')}
                actionHref={route('transactions.create')}
            />

            <div className="fh-card mb-4 flex flex-wrap gap-3 p-4">
                <select
                    className="fh-input max-w-xs"
                    value={filters.type || ''}
                    onChange={(e) => router.get(route('transactions.index'), { ...filters, type: e.target.value || undefined }, { preserveState: true })}
                >
                    <option value="">{t('transactions.all_types')}</option>
                    <option value="income">{t('transactions.income')}</option>
                    <option value="expense">{t('transactions.expense')}</option>
                </select>
                <select
                    className="fh-input max-w-xs"
                    value={filters.wallet_id || ''}
                    onChange={(e) => router.get(route('transactions.index'), { ...filters, wallet_id: e.target.value || undefined }, { preserveState: true })}
                >
                    <option value="">{t('transactions.all_wallets')}</option>
                    {wallets.map((w) => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                </select>
            </div>

            {rows.length === 0 ? (
                <EmptyState
                    title={t('transactions.empty_title')}
                    description={t('transactions.empty_desc')}
                    actionLabel={t('transactions.add')}
                    actionHref={route('transactions.create')}
                />
            ) : (
                <div className="fh-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                                <tr>
                                    <th className="px-4 py-3">{t('common.date')}</th>
                                    <th className="px-4 py-3">{t('common.type')}</th>
                                    <th className="px-4 py-3">{t('common.wallet')}</th>
                                    <th className="px-4 py-3">{t('common.note')}</th>
                                    <th className="px-4 py-3 text-right">{t('common.amount')}</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--fh-border)]">
                                {rows.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-brand-50/40">
                                        <td className="px-4 py-3 whitespace-nowrap">{formatDate(tx.transaction_date)}</td>
                                        <td className="px-4 py-3">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                {tx.type === 'income' ? t('transactions.income') : t('transactions.expense')}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">{tx.wallet?.name}</td>
                                        <td className="px-4 py-3 max-w-xs truncate">{tx.note || '—'}</td>
                                        <td className={`px-4 py-3 text-right font-bold ${tx.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                            {formatMoney(tx.amount)}
                                        </td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <Link href={route('transactions.edit', tx.id)} className="mr-2 text-brand-700 hover:underline">{t('common.edit')}</Link>
                                            <button
                                                type="button"
                                                className="text-rose-700 hover:underline"
                                                onClick={() => {
                                                    if (confirm(t('transactions.delete_confirm'))) {
                                                        router.delete(route('transactions.destroy', tx.id));
                                                    }
                                                }}
                                            >
                                                {t('common.delete')}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {transactions.links?.length > 3 && (
                        <div className="flex flex-wrap gap-2 border-t border-[var(--fh-border)] p-4">
                            {transactions.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`rounded-lg px-3 py-1 text-sm ${link.active ? 'bg-brand-700 text-white' : 'bg-brand-50 text-brand-800'} ${!link.url ? 'pointer-events-none opacity-40' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
