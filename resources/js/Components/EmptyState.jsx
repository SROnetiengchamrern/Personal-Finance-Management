import { Link } from '@inertiajs/react';

export default function EmptyState({ title, description, actionLabel, actionHref }) {
    return (
        <div className="fh-card flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            </div>
            <h3 className="text-lg font-bold text-brand-950">{title}</h3>
            {description && (
                <p className="mt-1 max-w-sm text-sm text-[var(--fh-muted)]">{description}</p>
            )}
            {actionHref && actionLabel && (
                <Link href={actionHref} className="fh-btn-primary mt-5">
                    {actionLabel}
                </Link>
            )}
        </div>
    );
}
