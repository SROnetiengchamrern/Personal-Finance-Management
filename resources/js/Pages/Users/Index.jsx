import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate } from '@/lib/format';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

function AddUserForm({ roles }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const form = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        currency: 'USD',
        role_id: roles.find((r) => r.name === 'user')?.id || '',
    });

    if (!open) {
        return (
            <button type="button" className="fh-btn-primary" onClick={() => setOpen(true)}>
                {t('users.add')}
            </button>
        );
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.post(route('users.store'), {
                    onSuccess: () => {
                        form.reset();
                        setOpen(false);
                    },
                });
            }}
            className="fh-card mb-6 space-y-4 p-5"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-950">{t('users.add')}</h2>
                <button type="button" className="text-sm text-[var(--fh-muted)] hover:underline" onClick={() => setOpen(false)}>
                    {t('common.cancel')}
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.name')} />
                    <TextInput className="fh-input mt-1 block w-full" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required />
                    <InputError message={form.errors.name} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.email')} />
                    <TextInput type="email" className="fh-input mt-1 block w-full" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} required />
                    <InputError message={form.errors.email} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.phone')} />
                    <TextInput className="fh-input mt-1 block w-full" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} />
                </div>
                <div>
                    <InputLabel value={t('users.role')} />
                    <select className="fh-input mt-1" value={form.data.role_id} onChange={(e) => form.setData('role_id', e.target.value)}>
                        <option value="">{t('users.no_role')}</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <InputLabel value={t('common.password')} />
                    <TextInput type="password" className="fh-input mt-1 block w-full" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} required />
                    <InputError message={form.errors.password} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.confirm_password')} />
                    <TextInput type="password" className="fh-input mt-1 block w-full" value={form.data.password_confirmation} onChange={(e) => form.setData('password_confirmation', e.target.value)} required />
                </div>
            </div>

            <div className="flex justify-end">
                <button type="submit" className="fh-btn-primary" disabled={form.processing}>
                    {t('users.create')}
                </button>
            </div>
        </form>
    );
}

export default function Index({ users, roles }) {
    const { t } = useTranslation();

    return (
        <AppLayout title={t('users.title')}>
            <Head title={t('users.title')} />
            <PageHeader
                title={t('users.title')}
                subtitle={t('users.subtitle', { count: users.length })}
            >
                <AddUserForm roles={roles} />
            </PageHeader>

            <div className="fh-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-brand-50 text-xs uppercase tracking-wider text-[var(--fh-muted)]">
                            <tr>
                                <th className="px-4 py-3">{t('common.name')}</th>
                                <th className="px-4 py-3">{t('common.phone')}</th>
                                <th className="px-4 py-3">{t('users.role')}</th>
                                <th className="px-4 py-3">{t('common.currency')}</th>
                                <th className="px-4 py-3">{t('users.stats')}</th>
                                <th className="px-4 py-3">{t('users.joined')}</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--fh-border)]">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-brand-50/40">
                                    <td className="px-4 py-3">
                                        <div className="font-semibold text-brand-950">{user.name}</div>
                                        <div className="text-xs text-[var(--fh-muted)]">{user.email}</div>
                                    </td>
                                    <td className="px-4 py-3">{user.phone || '—'}</td>
                                    <td className="px-4 py-3">
                                        {user.roles?.length ? (
                                            <div className="flex flex-wrap gap-1">
                                                {user.roles.map((role) => (
                                                    <span
                                                        key={role}
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                                                            role === 'admin'
                                                                ? 'bg-amber-100 text-amber-800'
                                                                : 'bg-brand-100 text-brand-800'
                                                        }`}
                                                    >
                                                        {role}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="text-[var(--fh-muted)]">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">{user.currency}</td>
                                    <td className="px-4 py-3 text-xs text-[var(--fh-muted)]">
                                        {t('users.stats_line', {
                                            wallets: user.wallets_count,
                                            tx: user.transactions_count,
                                            salaries: user.salaries_count,
                                        })}
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(user.created_at)}</td>
                                    <td className="px-4 py-3 text-right whitespace-nowrap">
                                        <Link href={route('users.show', user.id)} className="mr-2 text-brand-700 hover:underline">
                                            {t('common.view')}
                                        </Link>
                                        <button
                                            type="button"
                                            className="text-rose-700 hover:underline"
                                            onClick={() => {
                                                if (confirm(t('users.delete_confirm', { name: user.name }))) {
                                                    router.delete(route('users.destroy', user.id));
                                                }
                                            }}
                                        >
                                            {t('common.delete')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-4 py-10 text-center text-[var(--fh-muted)]">
                                        {t('users.empty')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
