import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function DocumentLocale() {
    const { locale } = usePage().props;
    const lang = locale || 'en';

    useEffect(() => {
        document.documentElement.lang = lang;

        if (lang === 'km') {
            document.body.classList.remove('font-sans');
            document.body.classList.add('font-khmer');
        } else {
            document.body.classList.remove('font-khmer');
            document.body.classList.add('font-sans');
        }
    }, [lang]);

    return null;
}
