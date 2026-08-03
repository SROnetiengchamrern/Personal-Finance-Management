import GoogleAuthButton from '@/Components/GoogleAuthButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout
            title={t('auth.register_title')}
            subtitle={t('auth.register_subtitle')}
        >
            <Head title={t('auth.register_head')} />

            <GoogleAuthButton label={t('auth.signup_google')} />

            <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--fh-border)]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--fh-muted)]">{t('common.or')}</span>
                <div className="h-px flex-1 bg-[var(--fh-border)]" />
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value={t('auth.full_name')} />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="fh-input mt-1.5 block w-full"
                        autoComplete="name"
                        isFocused
                        placeholder={t('auth.your_name')}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value={t('common.email')} />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="fh-input mt-1.5 block w-full"
                        autoComplete="username"
                        placeholder="you@email.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="phone" value={t('auth.phone_number')} />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="fh-input mt-1.5 block w-full"
                        autoComplete="tel"
                        placeholder="+855 12 345 678"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <InputLabel htmlFor="password" value={t('common.password')} />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="fh-input mt-1.5 block w-full"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value={t('auth.confirm')} />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="fh-input mt-1.5 block w-full"
                            autoComplete="new-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>
                </div>

                <button type="submit" className="fh-btn-primary w-full !py-3" disabled={processing}>
                    {processing ? t('auth.creating') : t('auth.create_one')}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-[var(--fh-muted)]">
                {t('auth.have_account')}{' '}
                <Link href={route('login')} className="font-bold text-brand-700 hover:text-brand-900">
                    {t('auth.sign_in')}
                </Link>
            </p>
        </GuestLayout>
    );
}
