import ApplicationLogo from '@/Components/ApplicationLogo';
import DocumentLocale from '@/Components/DocumentLocale';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTranslation } from '@/i18n/useTranslation';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle }) {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen lg:grid lg:grid-cols-2">
            <DocumentLocale />
            <aside className="relative hidden overflow-hidden bg-brand-950 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
                <div
                    className="pointer-events-none absolute inset-0 opacity-90"
                    style={{
                        background:
                            'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(20,184,166,0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 90% 80%, rgba(15,118,110,0.45), transparent 50%), linear-gradient(160deg, #0b1f1c 0%, #134e4a 45%, #0f766e 100%)',
                    }}
                />
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                        backgroundSize: '48px 48px',
                    }}
                />

                <div className="relative z-10">
                    <Link href={route('login')} className="inline-flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-400/20 ring-1 ring-teal-300/30">
                            <ApplicationLogo className="h-7 w-7 fill-current text-teal-200" />
                        </span>
                        <span>
                            <span className="block text-lg font-extrabold tracking-tight text-white">{t('app.name')}</span>
                            <span className="block text-xs text-teal-100/60">{t('guest.tagline')}</span>
                        </span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-md">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200/70">
                        {t('guest.eyebrow')}
                    </p>
                    <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white xl:text-5xl">
                        {t('guest.headline')}
                    </h1>
                    <p className="mt-5 text-base leading-relaxed text-teal-50/70">
                        {t('guest.body')}
                    </p>

                    <div className="mt-10 grid grid-cols-3 gap-4">
                        {[
                            { label: t('guest.stat_wallets'), value: t('guest.stat_wallets_value') },
                            { label: t('guest.stat_salary'), value: t('guest.stat_salary_value') },
                            { label: t('guest.stat_live'), value: t('guest.stat_live_value') },
                        ].map((item) => (
                            <div key={item.label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-teal-200/60">
                                    {item.label}
                                </p>
                                <p className="mt-1 text-sm font-bold text-white">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="relative z-10 text-xs text-teal-100/40">
                    © {new Date().getFullYear()} {t('app.name')}
                </p>
            </aside>

            <main className="relative flex min-h-screen flex-col justify-center bg-[var(--fh-bg)] px-4 py-10 sm:px-8">
                <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                        background:
                            'radial-gradient(ellipse 60% 40% at 100% 0%, rgba(204,251,241,0.8), transparent 55%), radial-gradient(ellipse 50% 35% at 0% 100%, rgba(240,253,250,0.9), transparent 50%)',
                    }}
                />

                <div className="relative z-10 mx-auto w-full max-w-md">
                    <div className="mb-6 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 lg:hidden">
                            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950">
                                <ApplicationLogo className="h-6 w-6 fill-current text-teal-200" />
                            </span>
                            <div>
                                <p className="text-base font-extrabold text-brand-950">{t('app.name')}</p>
                                <p className="text-xs text-[var(--fh-muted)]">{t('app.tagline')}</p>
                            </div>
                        </div>
                        <div className="ml-auto">
                            <LanguageSwitcher />
                        </div>
                    </div>

                    {(title || subtitle) && (
                        <div className="mb-8">
                            {title && (
                                <h2 className="text-3xl font-extrabold tracking-tight text-brand-950">
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className="mt-2 text-sm leading-relaxed text-[var(--fh-muted)]">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="fh-card p-6 sm:p-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
