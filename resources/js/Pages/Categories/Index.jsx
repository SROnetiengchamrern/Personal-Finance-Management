import InputError from '@/Components/InputError';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';

function CategoryList({ title, items, kind, colorDefault }) {
    const { t } = useTranslation();
    const form = useForm({
        kind,
        name: '',
        color: colorDefault,
        icon: kind,
    });

    return (
        <section className="fh-card p-5">
            <h2 className="mb-4 text-lg font-bold text-brand-950">{title}</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('categories.store'), {
                        onSuccess: () => form.reset('name'),
                    });
                }}
                className="mb-5 flex flex-col gap-2 sm:flex-row"
            >
                <TextInput
                    className="fh-input flex-1"
                    placeholder={t('categories.name_placeholder')}
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    required
                />
                <TextInput
                    type="color"
                    className="fh-input h-11 w-16"
                    value={form.data.color}
                    onChange={(e) => form.setData('color', e.target.value)}
                />
                <button className="fh-btn-primary" disabled={form.processing}>{t('common.add')}</button>
            </form>
            <InputError message={form.errors.name} className="mb-2" />

            <div className="space-y-2">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-xl bg-brand-50/60 px-3 py-2.5">
                        <div className="flex items-center gap-3">
                            <span className="h-3 w-3 rounded-full" style={{ background: item.color || colorDefault }} />
                            <span className="font-medium">{item.name}</span>
                        </div>
                        <button
                            type="button"
                            className="text-sm text-rose-700 hover:underline"
                            onClick={() => {
                                if (confirm(t('categories.delete_confirm'))) {
                                    router.delete(route('categories.destroy', [kind, item.id]));
                                }
                            }}
                        >
                            {t('common.delete')}
                        </button>
                    </div>
                ))}
                {items.length === 0 && (
                    <p className="text-sm text-[var(--fh-muted)]">{t('categories.empty')}</p>
                )}
            </div>
        </section>
    );
}

export default function Index({ incomeCategories, expenseCategories }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('categories.title')}>
            <Head title={t('categories.title')} />
            <PageHeader title={t('categories.title')} subtitle={t('categories.subtitle')} />
            <div className="grid gap-6 lg:grid-cols-2">
                <CategoryList title={t('transactions.income')} items={incomeCategories} kind="income" colorDefault="#16a34a" />
                <CategoryList title={t('transactions.expense')} items={expenseCategories} kind="expense" colorDefault="#dc2626" />
            </div>
        </AppLayout>
    );
}
