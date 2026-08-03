import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import StatCard from '@/Components/StatCard';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatMoney, walletDisplayName } from '@/lib/format';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, wallets, recentTransactions, budgets, goals }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('dashboard.title')}>
            <Head title={t('dashboard.title')} />

            <PageHeader
                title={t('dashboard.title')}
                subtitle={t('dashboard.subtitle')}
                actionLabel={t('transactions.add')}
                actionHref={route('transactions.create')}
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label={t('dashboard.total_balance')}
                    value={formatMoney(stats.total_balance, stats.currency)}
                    hint={t('dashboard.total_balance_hint', { currency: stats.currency })}
                />
                <StatCard label={t('dashboard.income')} value={formatMoney(stats.month_income, stats.currency)} tone="income" hint={t('dashboard.this_month')} />
                <StatCard label={t('dashboard.expense')} value={formatMoney(stats.month_expense, stats.currency)} tone="expense" hint={t('dashboard.this_month')} />
                <StatCard label={t('dashboard.net')} value={formatMoney(stats.month_net, stats.currency)} tone="soft" hint={t('dashboard.net_hint')} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-3">
                <section className="fh-card p-5 xl:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-brand-950">{t('dashboard.recent')}</h2>
                        <Link href={route('transactions.index')} className="text-sm font-semibold text-brand-700 hover:underline">
                            {t('common.view_all')}
                        </Link>
                    </div>

                    {recentTransactions.length === 0 ? (
                        <EmptyState
                            title={t('dashboard.no_transactions')}
                            description={t('dashboard.no_transactions_desc')}
                            actionLabel={t('transactions.add')}
                            actionHref={route('transactions.create')}
                        />
                    ) : (
                        <div className="divide-y divide-[var(--fh-border)]">
                            {recentTransactions.map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between gap-3 py-3">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-brand-950">
                                            {tx.note || tx.type}
                                        </p>
                                        <p className="text-xs text-[var(--fh-muted)]">
                                            {tx.wallet?.name} · {formatDate(tx.transaction_date)}
                                        </p>
                                    </div>
                                    <p className={`shrink-0 font-bold ${tx.type === 'income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                        {tx.type === 'income' ? '+' : '-'}
                                        {formatMoney(tx.display_amount ?? tx.amount, stats.currency)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section className="fh-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-brand-950">{t('dashboard.wallets')}</h2>
                        <Link href={route('wallets.index')} className="text-sm font-semibold text-brand-700 hover:underline">
                            {t('common.manage')}
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {wallets.map((wallet) => (
                            <div key={wallet.id} className="flex items-center gap-3 rounded-xl bg-brand-50/70 px-3 py-3">
                                <span className="h-3 w-3 rounded-full" style={{ background: wallet.color || '#0f766e' }} />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">{walletDisplayName(wallet, wallets)}</p>
                                    <p className="text-xs text-[var(--fh-muted)]">{wallet.type} · {wallet.currency}</p>
                                </div>
                                <p className="text-sm font-bold">{formatMoney(wallet.balance, wallet.currency)}</p>
                            </div>
                        ))}
                        {wallets.length === 0 && (
                            <p className="text-sm text-[var(--fh-muted)]">{t('dashboard.no_wallets')}</p>
                        )}
                    </div>
                </section>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
                <section className="fh-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-brand-950">{t('dashboard.budgets')}</h2>
                        <Link href={route('budgets.index')} className="text-sm font-semibold text-brand-700 hover:underline">
                            {t('common.view')}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {budgets.map((budget) => (
                            <div key={budget.id}>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="font-semibold">{budget.category?.name}</span>
                                    <span className="text-[var(--fh-muted)]">
                                        {formatMoney(budget.spent, stats.currency)} / {formatMoney(budget.amount, stats.currency)}
                                    </span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                                    <div
                                        className={`h-full rounded-full ${budget.percent >= 100 ? 'bg-rose-500' : 'bg-brand-600'}`}
                                        style={{ width: `${Math.min(budget.percent, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {budgets.length === 0 && (
                            <p className="text-sm text-[var(--fh-muted)]">{t('dashboard.no_budgets')}</p>
                        )}
                    </div>
                </section>

                <section className="fh-card p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-brand-950">{t('dashboard.savings')}</h2>
                        <Link href={route('savings.index')} className="text-sm font-semibold text-brand-700 hover:underline">
                            {t('common.view')}
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {goals.map((goal) => (
                            <div key={goal.id}>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="font-semibold">{goal.name}</span>
                                    <span className="text-[var(--fh-muted)]">{goal.percent}%</span>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                                    <div className="h-full rounded-full bg-emerald-500" style={{ width: `${goal.percent}%` }} />
                                </div>
                            </div>
                        ))}
                        {goals.length === 0 && (
                            <p className="text-sm text-[var(--fh-muted)]">{t('dashboard.no_savings')}</p>
                        )}
                    </div>
                </section>
            </div>
        </AppLayout>
    );
}
