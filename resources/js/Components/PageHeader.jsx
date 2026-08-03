import { Link } from '@inertiajs/react';

export default function PageHeader({ title, subtitle, actionLabel, actionHref, children }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-brand-950 sm:text-3xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-1 text-sm text-[var(--fh-muted)]">{subtitle}</p>
                )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
                {children}
                {actionHref && actionLabel && (
                    <Link href={actionHref} className="fh-btn-primary">
                        {actionLabel}
                    </Link>
                )}
            </div>
        </div>
    );
}
