export function formatMoney(amount, currency = 'USD') {
    const value = Number(amount || 0);
    try {
        return new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency,
            maximumFractionDigits: 2,
        }).format(value);
    } catch {
        return `${currency} ${value.toFixed(2)}`;
    }
}

export function formatDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

const currencyLabels = {
    USD: 'Dollar',
    KHR: 'Riel',
    EUR: 'Euro',
    THB: 'Baht',
    GBP: 'Pound',
};

/** Friendly currency label for display notes */
export function currencyLabel(code) {
    if (!code) return '';
    const upper = String(code).toUpperCase();
    return currencyLabels[upper] || upper;
}

/**
 * If the same wallet name exists more than once, append currency note:
 * ACLEDA (Dollar), ACLEDA (Riel)
 */
export function walletDisplayName(wallet, wallets = []) {
    const name = wallet?.name || 'Wallet';
    const duplicates = (wallets || []).filter(
        (item) => item.name?.trim().toLowerCase() === name.trim().toLowerCase(),
    );

    if (duplicates.length <= 1) {
        return name;
    }

    return `${name} (${currencyLabel(wallet.currency)})`;
}

/** Always show wallet + currency (+ optional balance) for selects */
export function walletOptionLabel(wallet, wallets = [], { withBalance = true } = {}) {
    const base = walletDisplayName(wallet, wallets);
    const currency = String(wallet?.currency || 'USD').toUpperCase();
    const hasCurrencyNote = base.toLowerCase().includes(`(${currencyLabel(currency).toLowerCase()})`);
    const title = hasCurrencyNote ? base : `${base} (${currencyLabel(currency)})`;

    if (!withBalance) {
        return `${title} · ${currency}`;
    }

    return `${title} · ${formatMoney(wallet.balance, currency)}`;
}
