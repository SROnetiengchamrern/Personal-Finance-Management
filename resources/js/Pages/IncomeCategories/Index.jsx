import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categories }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('income_categories.title')}>
            <Head title={t('income_categories.title')} />
            <PageHeader
                title={t('income_categories.title')}
                subtitle={t('income_categories.subtitle')}
                actionLabel={t('income_categories.add')}
                actionHref={route('income-categories.create')}
            />

            {categories.length === 0 ? (
                <EmptyState
                    title={t('income_categories.empty_title')}
                    description={t('income_categories.empty_desc')}
                    actionLabel={t('income_categories.add')}
                    actionHref={route('income-categories.create')}
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {categories.map((category) => (
                        <div key={category.id} className="fh-card p-5">
                            <div className="flex items-center gap-3">
                                <span
                                    className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                                    style={{ background: category.color || '#059669' }}
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M7 10l5-5 5 5" />
                                    </svg>
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-bold text-brand-950">{category.name}</h3>
                                    <p className="text-xs text-[var(--fh-muted)]">
                                        {category.icon || 'income'} · {category.color || '#059669'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Link
                                    href={route('income-categories.edit', category.id)}
                                    className="fh-btn-ghost flex-1 !text-xs"
                                >
                                    {t('common.edit')}
                                </Link>
                                <button
                                    type="button"
                                    className="fh-btn-danger flex-1 !text-xs"
                                    onClick={() => {
                                        if (confirm(t('categories.delete_confirm'))) {
                                            router.delete(route('income-categories.destroy', category.id));
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
