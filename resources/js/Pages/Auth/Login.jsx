import Checkbox from '@/Components/Checkbox';
import GoogleAuthButton from '@/Components/GoogleAuthButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout
            title={t('auth.login_title')}
            subtitle={t('auth.login_subtitle')}
        >
            <Head title={t('auth.login_head')} />

            {status && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                    {status}
                </div>
            )}

            <GoogleAuthButton label={t('auth.continue_google')} />

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--fh-border)]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--fh-muted)]">{t('common.or')}</span>
                <div className="h-px flex-1 bg-[var(--fh-border)]" />
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value={t('common.email')} />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="fh-input mt-1.5 block w-full"
                        autoComplete="username"
                        isFocused
                        placeholder="you@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex items-center justify-between gap-3">
                        <InputLabel htmlFor="password" value={t('common.password')} />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs font-semibold text-brand-700 hover:text-brand-900"
                            >
                                {t('auth.forgot')}
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="fh-input mt-1.5 block w-full"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <label className="flex items-center gap-2.5">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="text-sm text-[var(--fh-muted)]">{t('auth.remember')}</span>
                </label>

                <button type="submit" className="fh-btn-primary w-full !py-3" disabled={processing}>
                    {processing ? t('auth.signing_in') : t('auth.sign_in')}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--fh-muted)]">
                {t('auth.no_account')}{' '}
                <Link href={route('register')} className="font-bold text-brand-700 hover:text-brand-900">
                    {t('auth.create_one')}
                </Link>
            </p>
        </GuestLayout>
    );
}
