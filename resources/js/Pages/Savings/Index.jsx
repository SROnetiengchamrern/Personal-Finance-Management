import EmptyState from '@/Components/EmptyState';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate, formatMoney } from '@/lib/format';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Index({ goals }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('savings.title')}>
            <Head title={t('savings.title')} />
            <PageHeader
                title={t('savings.title')}
                subtitle={t('savings.subtitle')}
                actionLabel={t('savings.add')}
                actionHref={route('savings.create')}
            />

            {goals.length === 0 ? (
                <EmptyState
                    title={t('savings.empty_title')}
                    description={t('savings.empty_desc')}
                    actionLabel={t('savings.add')}
                    actionHref={route('savings.create')}
                />
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {goals.map((goal) => (
                        <Link key={goal.id} href={route('savings.show', goal.id)} className="fh-card block p-5 transition hover:border-brand-500">
                            <h3 className="font-bold text-brand-950">{goal.name}</h3>
                            <p className="mt-1 text-xs text-[var(--fh-muted)]">
                                {goal.deadline ? t('savings.due', { date: formatDate(goal.deadline) }) : t('savings.no_deadline')}
                            </p>
                            <p className="mt-4 text-xl font-extrabold">
                                {formatMoney(goal.current_amount)}
                                <span className="text-sm font-medium text-[var(--fh-muted)]"> / {formatMoney(goal.target_amount)}</span>
                            </p>
                            <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-100">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${goal.percent}%` }} />
                            </div>
                            <p className="mt-2 text-right text-xs font-semibold text-emerald-700">{goal.percent}%</p>
                        </Link>
                    ))}
                </div>
            )}
        </AppLayout>
    );
}

export function Create() {
    const { t } = useTranslation();
    const form = useForm({
        name: '',
        target_amount: '',
        current_amount: 0,
        deadline: '',
        icon: 'target',
    });

    return (
        <AppLayout title={t('savings.create_title')}>
            <Head title={t('savings.create_title')} />
            <PageHeader title={t('savings.create_title')} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('savings.store'));
                }}
                className="fh-card mx-auto max-w-2xl space-y-5 p-6"
            >
                <div>
                    <InputLabel value={t('common.name')} />
                    <TextInput className="fh-input mt-1 block w-full" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required />
                    <InputError message={form.errors.name} className="mt-1" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('savings.target')} />
                        <TextInput type="number" step="0.01" className="fh-input mt-1 block w-full" value={form.data.target_amount} onChange={(e) => form.setData('target_amount', e.target.value)} required />
                        <InputError message={form.errors.target_amount} className="mt-1" />
                    </div>
                    <div>
                        <InputLabel value={t('savings.deadline')} />
                        <TextInput type="date" className="fh-input mt-1 block w-full" value={form.data.deadline} onChange={(e) => form.setData('deadline', e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Link href={route('savings.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                    <button className="fh-btn-primary" disabled={form.processing}>{t('savings.create_btn')}</button>
                </div>
            </form>
        </AppLayout>
    );
}

export function Edit({ goal }) {
    const { t } = useTranslation();
    const form = useForm({
        name: goal.name,
        target_amount: goal.target_amount,
        deadline: goal.deadline ? String(goal.deadline).slice(0, 10) : '',
        icon: goal.icon || 'target',
    });

    return (
        <AppLayout title={t('savings.edit_title')}>
            <Head title={t('savings.edit_title')} />
            <PageHeader title={t('savings.edit_title')} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('savings.update', goal.id));
                }}
                className="fh-card mx-auto max-w-2xl space-y-5 p-6"
            >
                <div>
                    <InputLabel value={t('common.name')} />
                    <TextInput className="fh-input mt-1 block w-full" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <InputLabel value={t('savings.target')} />
                        <TextInput type="number" step="0.01" className="fh-input mt-1 block w-full" value={form.data.target_amount} onChange={(e) => form.setData('target_amount', e.target.value)} required />
                    </div>
                    <div>
                        <InputLabel value={t('savings.deadline')} />
                        <TextInput type="date" className="fh-input mt-1 block w-full" value={form.data.deadline} onChange={(e) => form.setData('deadline', e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Link href={route('savings.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                    <button className="fh-btn-primary" disabled={form.processing}>{t('common.save')}</button>
                </div>
            </form>
        </AppLayout>
    );
}

export function Show({ goal, wallets }) {
    const { t } = useTranslation();
    const form = useForm({
        wallet_id: wallets[0]?.id || '',
        amount: '',
        type: 'deposit',
    });

    return (
        <AppLayout title={goal.name}>
            <Head title={goal.name} />
            <PageHeader title={goal.name} subtitle={t('savings.percent_complete', { percent: goal.percent })}>
                <Link href={route('savings.edit', goal.id)} className="fh-btn-ghost">{t('common.edit')}</Link>
                <button
                    type="button"
                    className="fh-btn-danger"
                    onClick={() => {
                        if (confirm(t('savings.delete_confirm'))) {
                            router.delete(route('savings.destroy', goal.id));
                        }
                    }}
                >
                    {t('common.delete')}
                </button>
            </PageHeader>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="fh-card p-5 lg:col-span-2">
                    <p className="text-3xl font-extrabold">
                        {formatMoney(goal.current_amount)}
                        <span className="text-base font-medium text-[var(--fh-muted)]"> / {formatMoney(goal.target_amount)}</span>
                    </p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-brand-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${goal.percent}%` }} />
                    </div>

                    <h3 className="mb-3 mt-8 font-bold">{t('savings.activity')}</h3>
                    <div className="divide-y divide-[var(--fh-border)]">
                        {(goal.saving_transactions || []).map((tx) => (
                            <div key={tx.id} className="flex justify-between py-3 text-sm">
                                <div>
                                    <p className="font-semibold">
                                        {tx.type === 'deposit' ? t('savings.deposit') : t('savings.withdraw')}
                                    </p>
                                    <p className="text-xs text-[var(--fh-muted)]">{tx.wallet?.name} · {formatDate(tx.created_at)}</p>
                                </div>
                                <p className={`font-bold ${tx.type === 'deposit' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {formatMoney(tx.amount)}
                                </p>
                            </div>
                        ))}
                        {(goal.saving_transactions || []).length === 0 && (
                            <p className="py-6 text-sm text-[var(--fh-muted)]">{t('savings.no_activity')}</p>
                        )}
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.post(route('savings.transactions.store', goal.id), {
                            onSuccess: () => form.reset('amount'),
                        });
                    }}
                    className="fh-card h-fit space-y-4 p-5"
                >
                    <h2 className="font-bold">{t('savings.deposit_withdraw')}</h2>
                    <div>
                        <InputLabel value={t('common.type')} />
                        <select className="fh-input mt-1" value={form.data.type} onChange={(e) => form.setData('type', e.target.value)}>
                            <option value="deposit">{t('savings.deposit')}</option>
                            <option value="withdraw">{t('savings.withdraw')}</option>
                        </select>
                    </div>
                    <div>
                        <InputLabel value={t('common.wallet')} />
                        <select className="fh-input mt-1" value={form.data.wallet_id} onChange={(e) => form.setData('wallet_id', e.target.value)}>
                            {wallets.map((w) => (
                                <option key={w.id} value={w.id}>{w.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <InputLabel value={t('common.amount')} />
                        <TextInput type="number" step="0.01" className="fh-input mt-1 block w-full" value={form.data.amount} onChange={(e) => form.setData('amount', e.target.value)} required />
                    </div>
                    <button className="fh-btn-primary w-full" disabled={form.processing}>{t('common.save')}</button>
                </form>
            </div>
        </AppLayout>
    );
}
