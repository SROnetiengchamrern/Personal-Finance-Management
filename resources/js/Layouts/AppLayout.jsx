import ApplicationLogo from '@/Components/ApplicationLogo';
import AppFooter from '@/Components/AppFooter';
import DocumentLocale from '@/Components/DocumentLocale';
import FlashMessage from '@/Components/FlashMessage';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import SidebarLink from '@/Components/SidebarLink';
import { useTranslation } from '@/i18n/useTranslation';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const nav = [
    { labelKey: 'nav.dashboard', href: 'dashboard', icon: 'dashboard', match: 'dashboard' },
    { labelKey: 'nav.wallets', href: 'wallets.index', icon: 'wallets', match: 'wallets.*' },
    { labelKey: 'nav.transactions', href: 'transactions.index', icon: 'transactions', match: 'transactions.*' },
    { labelKey: 'nav.salary', href: 'salaries.index', icon: 'salary', match: 'salaries.*' },
    { labelKey: 'nav.transfers', href: 'transfers.index', icon: 'transfers', match: 'transfers.*' },
    { labelKey: 'nav.budgets', href: 'budgets.index', icon: 'budgets', match: 'budgets.*' },
    { labelKey: 'nav.savings', href: 'savings.index', icon: 'savings', match: 'savings.*' },
    { labelKey: 'nav.categories', href: 'categories.index', icon: 'categories', match: 'categories.*' },
    { labelKey: 'nav.income_categories', href: 'income-categories.index', icon: 'income', match: 'income-categories.*' },
    { labelKey: 'nav.expense_categories', href: 'expense-categories.index', icon: 'expense', match: 'expense-categories.*' },
    { labelKey: 'nav.currencies', href: 'currencies.index', icon: 'currencies', match: 'currencies.*' },
    { labelKey: 'nav.recurring', href: 'recurring.index', icon: 'recurring', match: 'recurring.*' },
    { labelKey: 'nav.notifications', href: 'notifications.index', icon: 'notifications', match: 'notifications.*' },
    { labelKey: 'nav.users', href: 'users.index', icon: 'users', match: 'users.*', adminOnly: true },
    { labelKey: 'nav.settings', href: 'settings.edit', icon: 'settings', match: 'settings.*' },
];

export default function AppLayout({ children, title }) {
    const { auth, unreadNotifications } = usePage().props;
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const navItems = nav.filter((item) => !item.adminOnly || auth.isAdmin);

    const Sidebar = (
        <aside className="flex h-full w-72 flex-col bg-brand-950 text-white">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20">
                    <ApplicationLogo className="h-6 w-6 fill-current text-teal-200" />
                </div>
                <div>
                    <p className="text-sm font-extrabold tracking-tight">{t('app.name')}</p>
                    <p className="text-xs text-teal-200/60">{t('app.tagline')}</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                {navItems.map((item) => (
                    <SidebarLink
                        key={item.href}
                        href={route(item.href)}
                        active={route().current(item.match)}
                        icon={item.icon}
                        badge={item.icon === 'notifications' ? unreadNotifications : 0}
                    >
                        {t(item.labelKey)}
                    </SidebarLink>
                ))}
            </nav>

            <div className="border-t border-white/10 p-4">
                <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-sm font-semibold text-white">{auth.user.name}</p>
                    <p className="truncate text-xs text-teal-100/50">{auth.user.email}</p>
                    <div className="mt-3 flex gap-2">
                        <Link href={route('profile.edit')} className="fh-btn-ghost flex-1 !border-white/10 !bg-white/5 !text-teal-50 !text-xs">
                            {t('nav.profile')}
                        </Link>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="fh-btn-ghost flex-1 !border-white/10 !bg-white/5 !text-teal-50 !text-xs"
                        >
                            {t('nav.logout')}
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );

    return (
        <div className="min-h-screen bg-[var(--fh-bg)] lg:flex">
            <DocumentLocale />
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
                {Sidebar}
            </div>

            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button className="absolute inset-0 bg-brand-950/50" onClick={() => setOpen(false)} />
                    <div className="relative z-50 h-full w-72 shadow-2xl">{Sidebar}</div>
                </div>
            )}

            <div className="flex min-h-screen flex-1 flex-col lg:pl-72">
                <header className="sticky top-0 z-30 border-b border-[var(--fh-border)] bg-white/90 backdrop-blur">
                    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex min-w-0 items-center gap-3">
                            <button
                                type="button"
                                className="rounded-xl border border-[var(--fh-border)] p-2 text-brand-800 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--fh-muted)]">
                                    {t('app.name')}
                                </p>
                                <p className="truncate text-base font-bold text-brand-950">{title || t('app.overview')}</p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                            <LanguageSwitcher />
                            <Link href={route('transactions.create')} className="fh-btn-primary !py-2 text-xs sm:text-sm">
                                {t('header.add_transaction')}
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
                    <FlashMessage />
                    {children}
                </main>

                <AppFooter />
            </div>
        </div>
    );
}
