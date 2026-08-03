import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate } from '@/lib/format';
import { Head, router } from '@inertiajs/react';

export default function Index({ notifications }) {
    const { t } = useTranslation();
    const rows = notifications.data || [];

    return (
        <AppLayout title={t('notifications.title')}>
            <Head title={t('notifications.title')} />
            <PageHeader title={t('notifications.title')} subtitle={t('notifications.subtitle')}>
                <button
                    type="button"
                    className="fh-btn-ghost"
                    onClick={() => router.post(route('notifications.read-all'))}
                >
                    {t('notifications.mark_all')}
                </button>
            </PageHeader>

            {rows.length === 0 ? (
                <EmptyState title={t('notifications.empty_title')} description={t('notifications.empty_desc')} />
            ) : (
                <div className="space-y-3">
                    {rows.map((item) => (
                        <div
                            key={item.id}
                            className={`fh-card flex items-start justify-between gap-4 p-4 ${item.is_read ? 'opacity-70' : 'border-brand-300 bg-brand-50/40'}`}
                        >
                            <div>
                                <h3 className="font-bold text-brand-950">{item.title}</h3>
                                <p className="mt-1 text-sm text-[var(--fh-muted)]">{item.message}</p>
                                <p className="mt-2 text-xs text-[var(--fh-muted)]">{formatDate(item.created_at)}</p>
                            </div>
                            {!item.is_read && (
                                <button
                                    type="button"
                                    className="fh-btn-ghost !text-xs"
                                    onClick={() => router.post(route('notifications.read', item.id))}
                                >
                                    {t('notifications.mark_read')}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}
