import { Link, usePage } from '@inertiajs/react';

const icons = {
    dashboard: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" />
        </svg>
    ),
    wallets: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5A2.5 2.5 0 015.5 5h13A2.5 2.5 0 0121 7.5v9a2.5 2.5 0 01-2.5 2.5h-13A2.5 2.5 0 013 16.5v-9z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 12h.01M3 10h18" />
        </svg>
    ),
    transactions: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h12M5 12h14M7 17h12" />
        </svg>
    ),
    salary: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 8c0-1.5 1.8-2.5 4-2.5s4 1 4 2.5-1.8 2.5-4 2.5S8 12.5 8 14s1.8 2.5 4 2.5 4-1 4-2.5" />
        </svg>
    ),
    transfers: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h12m0 0l-3-3m3 3l-3 3M17 16H5m0 0l3-3m-3 3l3 3" />
        </svg>
    ),
    budgets: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3v18M5 8h8M5 12h12M5 16h6" />
        </svg>
    ),
    savings: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3M4.9 4.9l2.1 2.1m9.9 9.9l2.1 2.1M3 12h3m12 0h3M4.9 19.1l2.1-2.1m9.9-9.9l2.1-2.1" />
        </svg>
    ),
    categories: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h6v6H4V6zm10 0h6v6h-6V6zM4 16h6v4H4v-4zm10-2h6v6h-6v-6z" />
        </svg>
    ),
    reports: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5m4 14V9m4 10V7m4 12v-6m4 6V9" />
        </svg>
    ),
    income: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M7 10l5-5 5 5" />
        </svg>
    ),
    expense: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M7 12l5 5 5-5" />
        </svg>
    ),
    currencies: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M8 8.5c0-1.4 1.8-2.5 4-2.5s4 1.1 4 2.5-1.8 2.5-4 2.5-4 1.1-4 2.5 1.8 2.5 4 2.5 4-1.1 4-2.5" />
        </svg>
    ),
    recurring: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 0113.5-5.8L20 8M20 12a8 8 0 01-13.5 5.8L4 16" />
        </svg>
    ),
    notifications: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" />
        </svg>
    ),
    users: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
    ),
    settings: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.3 4.3l.4-1.3h2.6l.4 1.3a7.9 7.9 0 011.8 1l1.3-.5 1.3 2.2-.9 1a8 8 0 010 2l.9 1-1.3 2.2-1.3-.5a7.9 7.9 0 01-1.8 1l-.4 1.3h-2.6l-.4-1.3a7.9 7.9 0 01-1.8-1l-1.3.5-1.3-2.2.9-1a8 8 0 010-2l-.9-1 1.3-2.2 1.3.5a7.9 7.9 0 011.8-1z" />
            <circle cx="12" cy="12" r="2.5" />
        </svg>
    ),
};

export default function SidebarLink({ href, active, icon, children, badge }) {
    return (
        <Link
            href={href}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                    ? 'bg-teal-500/20 text-teal-100'
                    : 'text-teal-100/70 hover:bg-white/5 hover:text-white'
            }`}
        >
            <span className={active ? 'text-teal-200' : 'text-teal-200/60 group-hover:text-teal-100'}>
                {icons[icon] || icons.dashboard}
            </span>
            <span className="flex-1">{children}</span>
            {badge > 0 && (
                <span className="rounded-full bg-teal-400 px-2 py-0.5 text-[10px] font-bold text-brand-950">
                    {badge}
                </span>
            )}
        </Link>
    );
}
