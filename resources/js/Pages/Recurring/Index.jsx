import EmptyState from '@/Components/EmptyState';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatMoney } from '@/lib/format';
import { Head, Link, router, useForm } from '@inertiajs/react';

const frequencyKeys = {
    daily: 'recurring.daily',
    weekly: 'recurring.weekly',
    monthly: 'recurring.monthly',
    yearly: 'recurring.yearly',
};

const typeKeys = {
    income: 'transactions.income',
    expense: 'transactions.expense',
};

const statusKeys = {
    active: 'common.active',
    paused: 'recurring.paused',
    completed: 'recurring.completed',
};

export default function Index({ items }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('recurring.title')}>
            <Head title={t('recurring.title')} />
            <PageHeader
                title={t('recurring.title')}
                subtitle={t('recurring.subtitle')}
                actionLabel={t('recurring.add')}
                actionHref={route('recurring.create')}
            />

            {items.length === 0 ? (
                <EmptyState
                    title={t('recurring.empty_title')}
                    description={t('recurring.empty_desc')}
                    actionLabel={t('recurring.add')}
                    actionHref={route('recurring.create')}
                />
            ) : (
                <div className="fh-card overflow-hidden">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                            <tr>
                                <th className="px-4 py-3">{t('common.title')}</th>
                                <th className="px-4 py-3">{t('common.type')}</th>
                                <th className="px-4 py-3">{t('recurring.frequency')}</th>
                                <th className="px-4 py-3">{t('recurring.next_run')}</th>
                                <th className="px-4 py-3 text-right">{t('common.amount')}</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--fh-border)]">
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-3 font-semibold">{item.title}</td>
                                    <td className="px-4 py-3">{t(typeKeys[item.type] || item.type)}</td>
                                    <td className="px-4 py-3">{t(frequencyKeys[item.frequency] || item.frequency)}</td>
                                    <td className="px-4 py-3">{formatDate(item.next_run)}</td>
                                    <td className="px-4 py-3 text-right font-bold">{formatMoney(item.amount)}</td>
                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                        <Link href={route('recurring.edit', item.id)} className="mr-2 text-brand-700 hover:underline">{t('common.edit')}</Link>
                                        <button
                                            type="button"
                                            className="text-rose-700 hover:underline"
                                            onClick={() => {
                                                if (confirm(t('recurring.delete_confirm'))) {
                                                    router.delete(route('recurring.destroy', item.id));
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
            )}
        </AppLayout>
    );
}

function RecurringForm({ form, wallets, incomeCategories, expenseCategories, onSubmit, submitLabel }) {
    const { t } = useTranslation();
    const categories = form.data.type === 'income' ? incomeCategories : expenseCategories;

    return (
        <form onSubmit={onSubmit} className="fh-card mx-auto max-w-2xl space-y-5 p-6">
            <div>
                <InputLabel value={t('common.title')} />
                <TextInput className="fh-input mt-1 block w-full" value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} required />
                <InputError message={form.errors.title} className="mt-1" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.type')} />
                    <select className="fh-input mt-1" value={form.data.type} onChange={(e) => form.setData('type', e.target.value)}>
                        <option value="income">{t('transactions.income')}</option>
                        <option value="expense">{t('transactions.expense')}</option>
                    </select>
                </div>
                <div>
                    <InputLabel value={t('recurring.frequency')} />
                    <select className="fh-input mt-1" value={form.data.frequency} onChange={(e) => form.setData('frequency', e.target.value)}>
                        <option value="daily">{t('recurring.daily')}</option>
                        <option value="weekly">{t('recurring.weekly')}</option>
                        <option value="monthly">{t('recurring.monthly')}</option>
                        <option value="yearly">{t('recurring.yearly')}</option>
                    </select>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.wallet')} />
                    <select className="fh-input mt-1" value={form.data.wallet_id} onChange={(e) => form.setData('wallet_id', e.target.value)}>
                        {wallets.map((w) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <InputLabel value={t('common.category')} />
                    <select className="fh-input mt-1" value={form.data.category_id || ''} onChange={(e) => form.setData('category_id', e.target.value)}>
                        <option value="">{t('common.none')}</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.amount')} />
                    <TextInput type="number" step="0.01" className="fh-input mt-1 block w-full" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} required />
                </div>
                <div>
                    <InputLabel value={t('recurring.next_run')} />
                    <TextInput type="date" className="fh-input mt-1 block w-full" value={form.data.next_run} onChange={(e) => form.setData('next_run', e.target.value)} required />
                </div>
            </div>
            {form.data.status !== undefined && (
                <div>
                    <InputLabel value={t('common.status')} />
                    <select className="fh-input mt-1" value={form.data.status} onChange={(e) => form.setData('status', e.target.value)}>
                        <option value="active">{t(statusKeys.active)}</option>
                        <option value="paused">{t(statusKeys.paused)}</option>
                        <option value="completed">{t(statusKeys.completed)}</option>
                    </select>
                </div>
            )}
            <div className="flex justify-end gap-2">
                <Link href={route('recurring.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                <button className="fh-btn-primary" disabled={form.processing}>{submitLabel}</button>
            </div>
        </form>
    );
}

export function Create({ wallets, incomeCategories, expenseCategories }) {
    const { t } = useTranslation();
    const form = useForm({
        title: '',
        type: 'expense',
        wallet_id: wallets[0]?.id || '',
        category_id: '',
        amount: '',
        frequency: 'monthly',
        next_run: new Date().toISOString().slice(0, 10),
    });

    return (
        <AppLayout title={t('recurring.create_title')}>
            <Head title={t('recurring.create_title')} />
            <PageHeader title={t('recurring.create_title')} />
            <RecurringForm
                form={form}
                wallets={wallets}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                submitLabel={t('common.create')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('recurring.store'));
                }}
            />
        </AppLayout>
    );
}

export function Edit({ item, wallets, incomeCategories, expenseCategories }) {
    const { t } = useTranslation();
    const form = useForm({
        title: item.title,
        type: item.type,
        wallet_id: item.wallet_id,
        category_id: item.category_id || '',
        amount: item.amount,
        frequency: item.frequency,
        next_run: String(item.next_run).slice(0, 10),
        status: item.status,
    });

    return (
        <AppLayout title={t('recurring.edit_title')}>
            <Head title={t('recurring.edit_title')} />
            <PageHeader title={t('recurring.edit_title')} />
            <RecurringForm
                form={form}
                wallets={wallets}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                submitLabel={t('common.save')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('recurring.update', item.id));
                }}
            />
        </AppLayout>
    );
}
