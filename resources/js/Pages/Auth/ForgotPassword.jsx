import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout
            title={t('auth.forgot_title')}
            subtitle={t('auth.forgot_subtitle')}
        >
            <Head title={t('auth.forgot_head')} />

            {status && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value={t('common.email')} />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="fh-input mt-1.5 block w-full"
                        isFocused
                        placeholder="you@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <button type="submit" className="fh-btn-primary w-full !py-3" disabled={processing}>
                    {processing ? t('auth.sending') : t('auth.email_reset')}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--fh-muted)]">
                {t('auth.remembered')}{' '}
                <Link href={route('login')} className="font-bold text-brand-700 hover:text-brand-900">
                    {t('auth.back_sign_in')}
                </Link>
            </p>
        </GuestLayout>
    );
}
