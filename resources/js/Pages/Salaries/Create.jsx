import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatMoney, walletOptionLabel } from '@/lib/format';
import { Head, Link, useForm } from '@inertiajs/react';

const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
];

function SalaryForm({ form, wallets, currencies, onSubmit, submitLabel, isCreate = false }) {
    const { t } = useTranslation();
    const { data, setData, processing, errors } = form;
    const selectedWallet = wallets.find((w) => String(w.id) === String(data.wallet_id));

    return (
        <form onSubmit={onSubmit} className="fh-card mx-auto max-w-2xl space-y-5 p-6">
            <div>
                <InputLabel value={t('common.title')} />
                <TextInput
                    className="fh-input mt-1 block w-full"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    required
                />
                <InputError message={errors.title} className="mt-1" />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
                <div>
                    <InputLabel value={t('common.month')} />
                    <select
                        className="fh-input mt-1"
                        value={data.month}
                        onChange={(e) => setData('month', Number(e.target.value))}
                        required
                    >
                        {months.map((month) => (
                            <option key={month.value} value={month.value}>{month.label}</option>
                        ))}
                    </select>
                    <InputError message={errors.month} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.year')} />
                    <TextInput
                        type="number"
                        min="2000"
                        max="2100"
                        className="fh-input mt-1 block w-full"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        required
                    />
                    <InputError message={errors.year} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('salaries.payment_date')} />
                    <TextInput
                        type="date"
                        className="fh-input mt-1 block w-full"
                        value={data.payment_date}
                        onChange={(e) => setData('payment_date', e.target.value)}
                        required
                    />
                    <InputError message={errors.payment_date} className="mt-1" />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.amount')} />
                    <TextInput
                        type="number"
                        step="0.01"
                        min="0.01"
                        className="fh-input mt-1 block w-full"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        required
                    />
                    <InputError message={errors.amount} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.currency')} />
                    <select
                        className="fh-input mt-1"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value)}
                        required
                    >
                        {currencies.map((currency) => (
                            <option key={currency.id} value={currency.code}>
                                {currency.code} — {currency.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.currency} className="mt-1" />
                </div>
            </div>

            <div>
                <InputLabel value={t('salaries.wallet_optional')} />
                <select
                    className="fh-input mt-1"
                    value={data.wallet_id || ''}
                    onChange={(e) => {
                        const walletId = e.target.value;
                        const wallet = wallets.find((w) => String(w.id) === String(walletId));
                        setData({
                            ...data,
                            wallet_id: walletId || '',
                            currency: wallet?.currency || data.currency,
                        });
                    }}
                >
                    <option value="">{t('salaries.no_wallet')}</option>
                    {wallets.map((wallet) => (
                        <option key={wallet.id} value={wallet.id}>
                            {walletOptionLabel(wallet, wallets)}
                        </option>
                    ))}
                </select>
                {isCreate && data.wallet_id && (
                    <p className="mt-1 text-xs text-emerald-700">
                        {t('salaries.credit_hint', {
                            amount: formatMoney(data.amount || 0, data.currency),
                            wallet: selectedWallet?.name || t('common.wallet'),
                        })}
                    </p>
                )}
                <InputError message={errors.wallet_id} className="mt-1" />
            </div>

            <div>
                <InputLabel value={t('common.note')} />
                <textarea
                    className="fh-input mt-1"
                    rows="3"
                    value={data.note || ''}
                    onChange={(e) => setData('note', e.target.value)}
                    placeholder={t('common.optional_note')}
                />
                <InputError message={errors.note} className="mt-1" />
            </div>

            <div className="flex justify-end gap-2">
                <Link href={route('salaries.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                <button type="submit" className="fh-btn-primary" disabled={processing}>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}

export default function Create({ wallets, currencies }) {
    const { t } = useTranslation();
    const now = new Date();
    const defaultCurrency = currencies?.find((c) => c.code === 'USD')?.code || currencies?.[0]?.code || 'USD';

    const form = useForm({
        title: 'Monthly Salary',
        amount: '',
        currency: defaultCurrency,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        payment_date: now.toISOString().slice(0, 10),
        wallet_id: '',
        note: '',
    });

    return (
        <AppLayout title={t('salaries.create_title')}>
            <Head title={t('salaries.create_title')} />
            <PageHeader title={t('salaries.create_title')} subtitle={t('salaries.create_subtitle')} />
            <SalaryForm
                form={form}
                wallets={wallets}
                currencies={currencies}
                submitLabel={t('salaries.save')}
                isCreate
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('salaries.store'));
                }}
            />
        </AppLayout>
    );
}

export function Edit({ salary, wallets, currencies }) {
    const { t } = useTranslation();
    const form = useForm({
        title: salary.title,
        amount: salary.amount,
        currency: salary.currency,
        month: salary.month,
        year: salary.year,
        payment_date: String(salary.payment_date).slice(0, 10),
        wallet_id: salary.wallet_id || '',
        note: salary.note || '',
    });

    return (
        <AppLayout title={t('salaries.edit_title')}>
            <Head title={t('salaries.edit_title')} />
            <PageHeader title={t('salaries.edit_title')} subtitle={`${salary.title} · ${salary.month}/${salary.year}`} />
            <SalaryForm
                form={form}
                wallets={wallets}
                currencies={currencies}
                submitLabel={t('salaries.update')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('salaries.update', salary.id));
                }}
            />
        </AppLayout>
    );
}
