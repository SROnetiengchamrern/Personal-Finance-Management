import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const types = [
    { value: 'Cash', key: 'wallets.type.cash' },
    { value: 'Bank', key: 'wallets.type.bank' },
    { value: 'Credit Card', key: 'wallets.type.credit_card' },
    { value: 'E-Wallet', key: 'wallets.type.e_wallet' },
];

function WalletForm({ submitLabel, form, onSubmit, currencies = [] }) {
    const { t } = useTranslation();
    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={onSubmit} className="fh-card mx-auto max-w-2xl space-y-5 p-6">
            <div>
                <InputLabel htmlFor="name" value={t('common.name')} />
                <TextInput id="name" className="fh-input mt-1 block w-full" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                <InputError message={errors.name} className="mt-1" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="type" value={t('wallets.type')} />
                    <select id="type" className="fh-input mt-1" value={data.type} onChange={(e) => setData('type', e.target.value)}>
                        {types.map((type) => (
                            <option key={type.value} value={type.value}>{t(type.key)}</option>
                        ))}
                    </select>
                    <InputError message={errors.type} className="mt-1" />
                </div>
                <div>
                    <InputLabel htmlFor="currency" value={t('common.currency')} />
                    <select
                        id="currency"
                        className="fh-input mt-1"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value)}
                        required
                    >
                        {currencies.length === 0 && <option value="">{t('wallets.no_currencies')}</option>}
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.code}>
                                {currency.code} — {currency.name} ({currency.symbol})
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.currency} className="mt-1" />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="balance" value={t('wallets.balance')} />
                    <TextInput id="balance" type="number" step="0.01" className="fh-input mt-1 block w-full" value={data.balance} onChange={(e) => setData('balance', e.target.value)} />
                    <InputError message={errors.balance} className="mt-1" />
                </div>
                <div>
                    <InputLabel htmlFor="color" value={t('common.color')} />
                    <TextInput id="color" type="color" className="fh-input mt-1 block h-11 w-full" value={data.color} onChange={(e) => setData('color', e.target.value)} />
                    <InputError message={errors.color} className="mt-1" />
                </div>
            </div>

            {data.status !== undefined && (
                <div>
                    <InputLabel htmlFor="status" value={t('common.status')} />
                    <select id="status" className="fh-input mt-1" value={data.status} onChange={(e) => setData('status', e.target.value)}>
                        <option value="active">{t('common.active')}</option>
                        <option value="inactive">{t('common.inactive')}</option>
                    </select>
                </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <Link href={route('wallets.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                <button type="submit" className="fh-btn-primary" disabled={processing}>{submitLabel}</button>
            </div>
        </form>
    );
}

export default function Create({ currencies }) {
    const { t } = useTranslation();
    const defaultCurrency = currencies?.find((c) => c.code === 'USD')?.code || currencies?.[0]?.code || 'USD';

    const form = useForm({
        name: '',
        type: 'Cash',
        balance: 0,
        currency: defaultCurrency,
        color: '#0f766e',
        icon: 'wallet',
    });

    return (
        <AppLayout title={t('wallets.create_title')}>
            <Head title={t('wallets.create_title')} />
            <PageHeader title={t('wallets.create_title')} subtitle={t('wallets.create_subtitle')} />
            <WalletForm
                submitLabel={t('wallets.create_btn')}
                form={form}
                currencies={currencies}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('wallets.store'));
                }}
            />
        </AppLayout>
    );
}

export function Edit({ wallet, currencies }) {
    const { t } = useTranslation();
    const form = useForm({
        name: wallet.name,
        type: wallet.type,
        balance: wallet.balance,
        currency: wallet.currency,
        color: wallet.color || '#0f766e',
        icon: wallet.icon || 'wallet',
        status: wallet.status,
    });

    return (
        <AppLayout title={t('wallets.edit_title')}>
            <Head title={t('wallets.edit_title')} />
            <PageHeader title={t('wallets.edit_title')} subtitle={wallet.name} />
            <WalletForm
                submitLabel={t('common.save_changes')}
                form={form}
                currencies={currencies}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('wallets.update', wallet.id));
                }}
            />
        </AppLayout>
    );
}
