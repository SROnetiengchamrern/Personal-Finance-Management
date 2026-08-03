import { usePage } from '@inertiajs/react';
import { translate } from './translations';

export function useTranslation() {
    const { locale } = usePage().props;
    const current = locale || 'en';

    const t = (key, replacements) => translate(current, key, replacements);

    return { t, locale: current };
}
