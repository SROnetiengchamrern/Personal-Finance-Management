export default function StatCard({ label, value, hint, tone = 'default' }) {
    const tones = {
        default: 'from-brand-900 to-brand-700 text-white',
        income: 'from-emerald-700 to-emerald-600 text-white',
        expense: 'from-rose-700 to-rose-600 text-white',
        soft: 'from-white to-teal-50 text-brand-950 border border-[var(--fh-border)]',
    };

    return (
        <div className={`rounded-2xl bg-gradient-to-br p-5 shadow-sm ${tones[tone]}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${tone === 'soft' ? 'text-[var(--fh-muted)]' : 'text-white/70'}`}>
                {label}
            </p>
            <p className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{value}</p>
            {hint && (
                <p className={`mt-2 text-xs ${tone === 'soft' ? 'text-[var(--fh-muted)]' : 'text-white/70'}`}>
                    {hint}
                </p>
            )}
        </div>
    );
}
