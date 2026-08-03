import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { locales } from '@/i18n/translations';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ settings, currencies, user }) {
    const { t } = useTranslation();
    const form = useForm({
        theme: settings.theme,
        currency: settings.currency,
        language: settings.language,
        date_format: settings.date_format,
        notification: settings.notification,
        timezone: user.timezone || 'UTC',
        phone: user.phone || '',
    });

    return (
        <AppLayout title={t('settings.title')}>
            <Head title={t('settings.title')} />
            <PageHeader title={t('settings.title')} subtitle={t('settings.subtitle')}>
                {/* <LanguageSwitcher /> */}
            </PageHeader>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('settings.update'));
                }}
                className="fh-card mx-auto max-w-2xl space-y-5 p-6"
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('settings.theme')} />
                        <select className="fh-input mt-1" value={form.data.theme} onChange={(e) => form.setData('theme', e.target.value)}>
                            <option value="light">{t('settings.theme.light')}</option>
                            <option value="dark">{t('settings.theme.dark')}</option>
                            <option value="system">{t('settings.theme.system')}</option>
                        </select>
                    </div>
                    <div>
                        <InputLabel value={t('settings.currency')} />
                        <select className="fh-input mt-1" value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)}>
                            {currencies.map((c) => (
                                <option key={c.id} value={c.code}>{c.code} — {c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('settings.language')} />
                        <select
                            className="fh-input mt-1"
                            value={form.data.language}
                            onChange={(e) => form.setData('language', e.target.value)}
                        >
                            {locales.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.flag} {item.native}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <InputLabel value={t('settings.date_format')} />
                        <select className="fh-input mt-1" value={form.data.date_format} onChange={(e) => form.setData('date_format', e.target.value)}>
                            <option value="Y-m-d">YYYY-MM-DD</option>
                            <option value="d/m/Y">DD/MM/YYYY</option>
                            <option value="m/d/Y">MM/DD/YYYY</option>
                        </select>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('settings.timezone')} />
                        <TextInput className="fh-input mt-1 block w-full" value={form.data.timezone} onChange={(e) => form.setData('timezone', e.target.value)} />
                        <InputError message={form.errors.timezone} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel value={t('settings.phone')} />
                        <TextInput className="fh-input mt-1 block w-full" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                    </div>
                </div>

                <label className="flex items-center gap-3 text-sm font-medium">
                    <input
                        type="checkbox"
                        checked={!!form.data.notification}
                        onChange={(e) => form.setData('notification', e.target.checked)}
                        className="rounded border-gray-300 text-brand-700 focus:ring-brand-700"
                    />
                    {t('settings.notifications')}
                </label>

                <div className="flex justify-end">
                    <button className="fh-btn-primary" disabled={form.processing}>{t('settings.save')}</button>
                </div>
            </form>
        </AppLayout>
    );
}
