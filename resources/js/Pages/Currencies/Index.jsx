import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

function AddCurrencyForm() {
    const { t } = useTranslation();
    const form = useForm({
        code: '',
        symbol: '',
        name: '',
        exchange_rate: '',
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.post(route('currencies.store'), {
                    onSuccess: () => form.reset(),
                });
            }}
            className="fh-card h-fit space-y-4 p-5"
        >
            <div>
                <h2 className="text-lg font-bold text-brand-950">{t('currencies.add')}</h2>
                <p className="mt-1 text-xs text-[var(--fh-muted)]">
                    {t('currencies.hint')}
                </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('currencies.code')} />
                    <TextInput
                        className="fh-input mt-1 block w-full uppercase"
                        placeholder="KHR"
                        maxLength={10}
                        value={form.data.code}
                        onChange={(e) => form.setData('code', e.target.value.toUpperCase())}
                        required
                    />
                    <InputError message={form.errors.code} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('currencies.symbol')} />
                    <TextInput
                        className="fh-input mt-1 block w-full"
                        placeholder="៛"
                        value={form.data.symbol}
                        onChange={(e) => form.setData('symbol', e.target.value)}
                        required
                    />
                    <InputError message={form.errors.symbol} className="mt-1" />
                </div>
            </div>

            <div>
                <InputLabel value={t('common.name')} />
                <TextInput
                    className="fh-input mt-1 block w-full"
                    placeholder="Cambodian Riel"
                    value={form.data.name}
                    onChange={(e) => form.setData('name', e.target.value)}
                    required
                />
                <InputError message={form.errors.name} className="mt-1" />
            </div>

            <div>
                <InputLabel value={t('currencies.rate')} />
                <TextInput
                    type="number"
                    step="any"
                    min="0.000001"
                    className="fh-input mt-1 block w-full"
                    placeholder="4100"
                    value={form.data.exchange_rate}
                    onChange={(e) => form.setData('exchange_rate', e.target.value)}
                    required
                />
                <InputError message={form.errors.exchange_rate} className="mt-1" />
            </div>

            <button type="submit" className="fh-btn-primary w-full" disabled={form.processing}>
                {t('currencies.add')}
            </button>
        </form>
    );
}

function CurrencyRow({ currency, canManage }) {
    const { t } = useTranslation();
    const isUsd = currency.code === 'USD';
    const [editing, setEditing] = useState(false);
    const form = useForm({
        code: currency.code,
        symbol: currency.symbol,
        name: currency.name,
        exchange_rate: currency.exchange_rate,
    });

    if (editing) {
        return (
            <tr className="bg-brand-50/50">
                <td className="px-4 py-3" colSpan={6}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.put(route('currencies.update', currency.id), {
                                onSuccess: () => setEditing(false),
                            });
                        }}
                        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
                    >
                        <div>
                            <InputLabel value={t('currencies.code')} />
                            <TextInput
                                className="fh-input mt-1 block w-full uppercase"
                                value={form.data.code}
                                disabled={isUsd}
                                onChange={(e) => form.setData('code', e.target.value.toUpperCase())}
                                required
                            />
                            <InputError message={form.errors.code} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value={t('currencies.symbol')} />
                            <TextInput
                                className="fh-input mt-1 block w-full"
                                value={form.data.symbol}
                                onChange={(e) => form.setData('symbol', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel value={t('common.name')} />
                            <TextInput
                                className="fh-input mt-1 block w-full"
                                value={form.data.name}
                                onChange={(e) => form.setData('name', e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <InputLabel value={t('currencies.rate_per_usd')} />
                            <TextInput
                                type="number"
                                step="any"
                                className="fh-input mt-1 block w-full"
                                value={form.data.exchange_rate}
                                disabled={isUsd}
                                onChange={(e) => form.setData('exchange_rate', e.target.value)}
                                required
                            />
                            <InputError message={form.errors.exchange_rate} className="mt-1" />
                        </div>
                        <div className="flex items-end gap-2">
                            <button type="submit" className="fh-btn-primary flex-1" disabled={form.processing}>
                                {t('common.save')}
                            </button>
                            <button type="button" className="fh-btn-ghost flex-1" onClick={() => setEditing(false)}>
                                {t('common.cancel')}
                            </button>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }

    return (
        <tr className="hover:bg-brand-50/40">
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-800">
                        {currency.symbol}
                    </span>
                    <div>
                        <p className="font-bold text-brand-950">{currency.code}</p>
                        {isUsd && <p className="text-[10px] font-semibold uppercase text-teal-700">{t('currencies.base')}</p>}
                    </div>
                </div>
            </td>
            <td className="px-4 py-3">{currency.name}</td>
            <td className="px-4 py-3 font-semibold tabular-nums">{Number(currency.exchange_rate).toLocaleString()}</td>
            <td className="px-4 py-3 text-sm text-[var(--fh-muted)]">
                1 USD = {currency.symbol}
                {Number(currency.exchange_rate).toLocaleString()}
            </td>
            <td className="px-4 py-3 text-sm text-[var(--fh-muted)]">
                {currency.code === 'USD'
                    ? '1 USD = $1'
                    : `1 ${currency.code} ≈ $${Number(currency.to_usd_example).toFixed(6)}`}
            </td>
            <td className="px-4 py-3 text-right whitespace-nowrap">
                {canManage && (
                    <>
                        <button type="button" className="mr-2 text-brand-700 hover:underline" onClick={() => setEditing(true)}>
                            {t('common.edit')}
                        </button>
                        {!isUsd && (
                            <button
                                type="button"
                                className="text-rose-700 hover:underline"
                                onClick={() => {
                                    if (confirm(t('currencies.delete_confirm', { code: currency.code }))) {
                                        router.delete(route('currencies.destroy', currency.id));
                                    }
                                }}
                            >
                                {t('common.delete')}
                            </button>
                        )}
                    </>
                )}
            </td>
        </tr>
    );
}

export default function Index({ currencies, canManage = false }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('currencies.title')}>
            <Head title={t('currencies.title')} />
            <PageHeader
                title={t('currencies.title')}
                subtitle={t('currencies.subtitle')}
            />

            <div className={`grid gap-6 ${canManage ? 'lg:grid-cols-3' : ''}`}>
                {canManage && <AddCurrencyForm />}

                <div className={`fh-card overflow-hidden ${canManage ? 'lg:col-span-2' : ''}`}>
                    <div className="border-b border-[var(--fh-border)] px-4 py-3">
                        <h2 className="font-bold text-brand-950">{t('currencies.rates_title')}</h2>
                        <p className="text-xs text-[var(--fh-muted)]">
                            {canManage ? t('currencies.rates_desc') : t('currencies.view_only')}
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm">
                            <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                                <tr>
                                    <th className="px-4 py-3">{t('common.currency')}</th>
                                    <th className="px-4 py-3">{t('common.name')}</th>
                                    <th className="px-4 py-3">{t('currencies.rate_per_usd')}</th>
                                    <th className="px-4 py-3">{t('currencies.one_usd_equals')}</th>
                                    <th className="px-4 py-3">{t('currencies.to_usd')}</th>
                                    {canManage && <th className="px-4 py-3" />}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--fh-border)]">
                                {currencies.map((currency) => (
                                    <CurrencyRow key={currency.id} currency={currency} canManage={canManage} />
                                ))}
                                {currencies.length === 0 && (
                                    <tr>
                                        <td colSpan={canManage ? 6 : 5} className="px-4 py-10 text-center text-[var(--fh-muted)]">
                                            {t('currencies.empty')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
