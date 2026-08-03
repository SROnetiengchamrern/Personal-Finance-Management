import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('expense_categories.title')}>
            <Head title={t('expense_categories.title')} />
            <PageHeader
                title={t('expense_categories.title')}
                subtitle={t('expense_categories.subtitle')}
                actionLabel={t('expense_categories.add')}
                actionHref={route('expense-categories.create')}
            />

            {categories.length === 0 ? (
                <EmptyState
                    title={t('expense_categories.empty_title')}
                    description={t('expense_categories.empty_desc')}
                    actionLabel={t('expense_categories.add')}
                    actionHref={route('expense-categories.create')}
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.id} className="fh-card p-5">
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                                    style={{ background: category.color || '#dc2626' }}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-bold text-brand-950">{category.name}</h3>
                                    <p className="text-xs text-[var(--fh-muted)]">
                                        {category.icon || 'expense'} · {category.color || '#dc2626'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={route('expense-categories.edit', category.id)}
                                    className="fh-btn-ghost flex-1 !text-xs"
                                >
                                    {t('common.edit')}
                                </Link>
                                <button
                                    type="button"
                                    className="fh-btn-danger flex-1 !text-xs"
                                    onClick={() => {
                                        if (confirm(t('categories.delete_confirm'))) {
                                            router.delete(route('expense-categories.destroy', category.id));
                                        }
                                    }}
                                >
                                    {t('common.delete')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
