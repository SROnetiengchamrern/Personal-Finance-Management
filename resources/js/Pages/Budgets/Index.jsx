import EmptyState from '@/Components/EmptyState';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatMoney } from '@/lib/format';
import { Head, router, useForm } from '@inertiajs/react';

export default function Index({ budgets, filters, categories }) {
    const { t } = useTranslation();
    const form = useForm({
        category_id: categories[0]?.id || '',
        amount: '',
        month: filters.month,
        year: filters.year,
    });

    return (
        <AppLayout title={t('budgets.title')}>
            <Head title={t('budgets.title')} />
            <PageHeader title={t('budgets.title')} subtitle={t('budgets.subtitle')} />

            <div className="mb-4 flex flex-wrap gap-3">
                <select
                    className="fh-input max-w-[140px]"
                    value={filters.month}
                    onChange={(e) => router.get(route('budgets.index'), { month: e.target.value, year: filters.year }, { preserveState: true })}
                >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString(undefined, { month: 'long' })}</option>
                    ))}
                </select>
                <TextInput
                    type="number"
                    className="fh-input max-w-[120px]"
                    value={filters.year}
                    onChange={(e) => router.get(route('budgets.index'), { month: filters.month, year: e.target.value }, { preserveState: true })}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.post(route('budgets.store'), { onSuccess: () => form.reset('amount') });
                    }}
                    className="fh-card h-fit space-y-4 p-5"
                >
                    <h2 className="font-bold text-brand-950">{t('budgets.set')}</h2>
                    <div>
                        <InputLabel value={t('common.category')} />
                        <select className="fh-input mt-1" value={form.data.category_id} onChange={(e) => form.setData('category_id', e.target.value)}>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <InputError message={form.errors.category_id} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel value={t('common.amount')} />
                        <TextInput type="number" step="0.01" className="fh-input mt-1 block w-full" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} required />
                        <InputError message={form.errors.amount} className="mt-1" />
                    </div>
                    <button className="fh-btn-primary w-full" disabled={form.processing}>{t('budgets.save')}</button>
                </form>

                <div className="lg:col-span-2 space-y-3">
                    {budgets.length === 0 ? (
                        <EmptyState title={t('budgets.empty_title')} description={t('budgets.empty_desc')} />
                    ) : (
                        budgets.map((budget) => (
                            <div key={budget.id} className="fh-card p-5">
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-bold text-brand-950">{budget.category?.name}</h3>
                                        <p className="text-xs text-[var(--fh-muted)]">
                                            {t('budgets.spent_of', {
                                                spent: formatMoney(budget.spent),
                                                amount: formatMoney(budget.amount),
                                            })}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        className="text-sm text-rose-700 hover:underline"
                                        onClick={() => {
                                            if (confirm(t('budgets.delete_confirm'))) {
                                                router.delete(route('budgets.destroy', budget.id));
                                            }
                                        }}
                                    >
                                        {t('common.delete')}
                                    </button>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-brand-100">
                                    <div
                                        className={`h-full rounded-full ${budget.percent >= 100 ? 'bg-rose-500' : 'bg-brand-600'}`}
                                        style={{ width: `${Math.min(budget.percent, 100)}%` }}
                                    />
                                </div>
                                <p className="mt-2 text-right text-xs font-semibold text-[var(--fh-muted)]">{budget.percent}%</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
