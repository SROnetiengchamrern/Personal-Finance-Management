import PageHeader from '@/Components/PageHeader';
import StatCard from '@/Components/StatCard';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatMoney } from '@/lib/format';
import { Head, router } from '@inertiajs/react';

export default function Index({ filters, currency, summary, byCategory, daily }) {
    const { t } = useTranslation();
    const maxDaily = Math.max(1, ...daily.map((d) => Math.max(d.income, d.expense)));

    return (
        <AppLayout title={t('reports.title')}>
            <Head title={t('reports.title')} />
            <PageHeader title={t('reports.title')} subtitle={t('reports.subtitle')} />

            <div className="mb-4 flex flex-wrap gap-3">
                <select
                    className="fh-input max-w-[160px]"
                    value={filters.month}
                    onChange={(e) => router.get(route('reports.index'), { month: e.target.value, year: filters.year }, { preserveState: true })}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString(undefined, { month: 'long' })}</option>
                    ))}
                </select>
                <input
                    type="number"
                    className="fh-input max-w-[120px]"
                    value={filters.year}
                    onChange={(e) => router.get(route('reports.index'), { month: filters.month, year: e.target.value }, { preserveState: true })}
                />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <StatCard label={t('dashboard.income')} value={formatMoney(summary.income, currency)} tone="income" />
                <StatCard label={t('dashboard.expense')} value={formatMoney(summary.expense, currency)} tone="expense" />
                <StatCard label={t('dashboard.net')} value={formatMoney(summary.net, currency)} tone="soft" />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
                <section className="fh-card p-5">
                    <h2 className="mb-4 text-lg font-bold text-brand-950">{t('reports.by_category')}</h2>
                    {byCategory.length === 0 ? (
                        <p className="text-sm text-[var(--fh-muted)]">{t('reports.no_data')}</p>
                    ) : (
                        <div className="space-y-3">
                            {byCategory.map((row) => (
                                <div key={`${row.category_id}-${row.name}`}>
                                    <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                                        <span className="font-semibold text-brand-950">{row.name}</span>
                                        <span className="text-[var(--fh-muted)]">
                                            {formatMoney(row.amount, currency)} · {row.percent}%
                                        </span>
                                    </div>
                                    <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${Math.min(row.percent, 100)}%`, background: row.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="fh-card p-5">
                    <h2 className="mb-4 text-lg font-bold text-brand-950">{t('reports.daily_cashflow')}</h2>
                    <div className="flex h-48 items-end gap-1 overflow-x-auto pb-2">
                        {daily.map((day) => (
                            <div key={day.day} className="flex min-w-[18px] flex-1 flex-col items-center justify-end gap-1">
                                <div className="flex h-40 w-full items-end justify-center gap-0.5">
                                    <div
                                        className="w-1/2 rounded-t bg-emerald-500/80"
                                        style={{ height: `${(day.income / maxDaily) * 100}%` }}
                                        title={`${t('dashboard.income')}: ${formatMoney(day.income, currency)}`}
                                    />
                                    <div
                                        className="w-1/2 rounded-t bg-rose-500/80"
                                        style={{ height: `${(day.expense / maxDaily) * 100}%` }}
                                        title={`${t('dashboard.expense')}: ${formatMoney(day.expense, currency)}`}
                                    />
                                </div>
                                <span className="text-[10px] text-[var(--fh-muted)]">{day.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-[var(--fh-muted)]">
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" /> {t('dashboard.income')}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" /> {t('dashboard.expense')}
                        </span>
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
