import ApplicationLogo from '@/Components/ApplicationLogo';
import { useTranslation } from '@/i18n/useTranslation';
import { Link } from '@inertiajs/react';

export default function AppFooter() {
    const { t } = useTranslation();
    const year = new Date().getFullYear();

    const links = [
        { labelKey: 'nav.dashboard', href: 'dashboard' },
        { labelKey: 'nav.wallets', href: 'wallets.index' },
        { labelKey: 'nav.transactions', href: 'transactions.index' },
        { labelKey: 'nav.settings', href: 'settings.edit' },
    ];

    return (
        <footer className="mt-auto border-t border-[var(--fh-border)] bg-white">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-950">
                            <ApplicationLogo className="h-5 w-5 fill-current text-teal-200" />
                        </span>
                        <div>
                            <p className="text-sm font-extrabold text-brand-950">{t('app.name')}</p>
                            <p className="text-xs text-[var(--fh-muted)]">{t('app.tagline')}</p>
                        </div>
                    </div>

                    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {links.map((item) => (
                            <Link
                                key={item.href}
                                href={route(item.href)}
                                className="text-xs font-semibold text-[var(--fh-muted)] transition hover:text-brand-800"
                            >
                                {t(item.labelKey)}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="mt-5 flex flex-col gap-1 border-t border-[var(--fh-border)] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[var(--fh-muted)]">
                        © {year} {t('app.name')}. {t('footer.rights')}
                    </p>
                    <p className="text-xs text-[var(--fh-muted)]">{t('footer.made_for')}</p>
                </div>
            </div>
        </footer>
    );
}
