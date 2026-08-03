import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatMoney } from '@/lib/format';
import { Head, Link, router } from '@inertiajs/react';

const monthNames = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export default function Index({ salaries, filters, years, total, currency }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('salaries.title')}>
            <Head title={t('salaries.title')} />
            <PageHeader
                title={t('salaries.title')}
                subtitle={t('salaries.subtitle')}
                actionLabel={t('salaries.add')}
                actionHref={route('salaries.create')}
            />

            <div className="mb-4 flex flex-wrap items-center gap-3">
                <select
                    className="fh-input max-w-[140px]"
                    value={filters.year}
                    onChange={(e) =>
                        router.get(route('salaries.index'), { year: e.target.value }, { preserveState: true })
                    }
                >
                    {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
                <div className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800">
                    {t('salaries.total_year', { year: filters.year, amount: formatMoney(total, currency) })}
                </div>
            </div>

            {salaries.length === 0 ? (
                <EmptyState
                    title={t('salaries.empty_title')}
                    description={t('salaries.empty_desc')}
                    actionLabel={t('salaries.add')}
                    actionHref={route('salaries.create')}
                />
            ) : (
                <div className="fh-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                                <tr>
                                    <th className="px-4 py-3">{t('common.month')}</th>
                                    <th className="px-4 py-3">{t('common.year')}</th>
                                    <th className="px-4 py-3">{t('salaries.payment_date')}</th>
                                    <th className="px-4 py-3">{t('common.title')}</th>
                                    <th className="px-4 py-3">{t('common.wallet')}</th>
                                    <th className="px-4 py-3 text-right">{t('common.amount')}</th>
                                    <th className="px-4 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--fh-border)]">
                                {salaries.map((salary) => (
                                    <tr key={salary.id} className="hover:bg-brand-50/40">
                                        <td className="px-4 py-3 font-semibold">
                                            {monthNames[salary.month] || salary.month}
                                        </td>
                                        <td className="px-4 py-3">{salary.year}</td>
                                        <td className="px-4 py-3">{formatDate(salary.payment_date)}</td>
                                        <td className="px-4 py-3">
                                            <div>{salary.title}</div>
                                            {salary.note && (
                                                <div className="text-xs text-[var(--fh-muted)]">{salary.note}</div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{salary.wallet?.name || '—'}</td>
                                        <td className="px-4 py-3 text-right font-bold text-emerald-700">
                                            {formatMoney(salary.amount, salary.currency)}
                                        </td>
                                        <td className="px-4 py-3 text-right whitespace-nowrap">
                                            <Link
                                                href={route('salaries.edit', salary.id)}
                                                className="mr-2 text-brand-700 hover:underline"
                                            >
                                                {t('common.edit')}
                                            </Link>
                                            <button
                                                type="button"
                                                className="text-rose-700 hover:underline"
                                                onClick={() => {
                                                    if (confirm(t('salaries.delete_confirm'))) {
                                                        router.delete(route('salaries.destroy', salary.id));
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
                </div>
            )}
        </AppLayout>
    );
}
