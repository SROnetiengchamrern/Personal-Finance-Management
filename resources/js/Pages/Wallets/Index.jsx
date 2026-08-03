import EmptyState from '@/Components/EmptyState';
import PageHeader from '@/Components/PageHeader';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatMoney, walletDisplayName } from '@/lib/format';
import { Head, Link, router } from '@inertiajs/react';

const typeKeys = {
    Cash: 'wallets.type.cash',
    Bank: 'wallets.type.bank',
    'Credit Card': 'wallets.type.credit_card',
    'E-Wallet': 'wallets.type.e_wallet',
};

export default function Index({ wallets }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('wallets.title')}>
            <Head title={t('wallets.title')} />
            <PageHeader
                title={t('wallets.title')}
                subtitle={t('wallets.subtitle')}
                actionLabel={t('wallets.add')}
                actionHref={route('wallets.create')}
            />

            {wallets.length === 0 ? (
                <EmptyState
                    title={t('wallets.empty_title')}
                    description={t('wallets.empty_desc')}
                    actionLabel={t('wallets.add')}
                    actionHref={route('wallets.create')}
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {wallets.map((wallet) => (
                        <div key={wallet.id} className="fh-card p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="h-10 w-10 rounded-xl" style={{ background: wallet.color || '#0f766e' }} />
                                    <div>
                                        <h3 className="font-bold text-brand-950">
                                            {walletDisplayName(wallet, wallets)}
                                        </h3>
                                        <p className="text-xs text-[var(--fh-muted)]">
                                            {typeKeys[wallet.type] ? t(typeKeys[wallet.type]) : wallet.type}
                                            {' · '}
                                            {wallet.status === 'active' ? t('common.active') : wallet.status === 'inactive' ? t('common.inactive') : wallet.status}
                                            {' · '}
                                            {wallet.currency}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-5 text-2xl font-extrabold">{formatMoney(wallet.balance, wallet.currency)}</p>
                            <div className="mt-4 flex gap-2">
                                <Link href={route('wallets.edit', wallet.id)} className="fh-btn-ghost flex-1 !text-xs">
                                    {t('common.edit')}
                                </Link>
                                <button
                                    type="button"
                                    className="fh-btn-danger flex-1 !text-xs"
                                    onClick={() => {
                                        if (confirm(t('wallets.delete_confirm'))) {
                                            router.delete(route('wallets.destroy', wallet.id));
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
