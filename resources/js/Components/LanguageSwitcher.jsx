import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { localeMeta, locales } from '@/i18n/translations';

export default function LanguageSwitcher({ compact = false }) {
    const { locale } = usePage().props;
    const current = localeMeta(locale || 'en');
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const switchTo = (code) => {
        setOpen(false);
        if (code === current.code) {
            return;
        }
        router.put(route('language.update'), { language: code }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="relative" ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--fh-border)] bg-white px-2.5 py-2 text-sm font-semibold text-brand-950 shadow-sm transition hover:bg-slate-50"
                aria-label="Switch language"
                title={current.native}
            >
                <span className="text-lg leading-none" aria-hidden="true">
                    {current.flag}
                </span>
                {!compact && (
                    <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
                )}
                <svg className="h-3.5 w-3.5 text-[var(--fh-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--fh-border)] bg-white py-1 shadow-lg">
                    {locales.map((item) => (
                        <button
                            key={item.code}
                            type="button"
                            onClick={() => switchTo(item.code)}
                            className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition hover:bg-teal-50 ${
                                item.code === current.code ? 'bg-teal-50 font-bold text-brand-900' : 'text-brand-950'
                            }`}
                        >
                            <span className="text-lg leading-none">{item.flag}</span>
                            <span className="flex-1">{item.native}</span>
                            <span className="text-xs text-[var(--fh-muted)]">{item.code.toUpperCase()}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
