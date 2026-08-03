import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { formatDate } from '@/lib/format';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Show({ user, roles }) {
    const { t } = useTranslation();
    const form = useForm({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        currency: user.currency || 'USD',
        role_id: roles.find((r) => user.roles?.includes(r.name))?.id || '',
        password: '',
        password_confirmation: '',
    });

    return (
        <AppLayout title={user.name}>
            <Head title={user.name} />
            <PageHeader title={user.name} subtitle={user.email}>
                <Link href={route('users.index')} className="fh-btn-ghost">{t('users.back')}</Link>
            </PageHeader>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-1">
                    <div className="fh-card p-5">
                        <h2 className="mb-3 font-bold text-brand-950">{t('users.overview')}</h2>
                        <dl className="space-y-2 text-sm">
                            <div className="flex justify-between gap-3">
                                <dt className="text-[var(--fh-muted)]">{t('users.role')}</dt>
                                <dd className="font-semibold">{user.roles?.join(', ') || '—'}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-[var(--fh-muted)]">{t('common.currency')}</dt>
                                <dd className="font-semibold">{user.currency}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-[var(--fh-muted)]">{t('settings.timezone')}</dt>
                                <dd className="font-semibold">{user.timezone || '—'}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-[var(--fh-muted)]">{t('users.joined')}</dt>
                                <dd className="font-semibold">{formatDate(user.created_at)}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="fh-card grid grid-cols-2 gap-3 p-5 text-center">
                        <div>
                            <p className="text-2xl font-extrabold text-brand-950">{user.wallets_count}</p>
                            <p className="text-xs text-[var(--fh-muted)]">{t('nav.wallets')}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-brand-950">{user.transactions_count}</p>
                            <p className="text-xs text-[var(--fh-muted)]">{t('nav.transactions')}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-brand-950">{user.salaries_count}</p>
                            <p className="text-xs text-[var(--fh-muted)]">{t('nav.salary')}</p>
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-brand-950">{user.budgets_count}</p>
                            <p className="text-xs text-[var(--fh-muted)]">{t('nav.budgets')}</p>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.put(route('users.update', user.id), {
                            onSuccess: () => {
                                form.setData('password', '');
                                form.setData('password_confirmation', '');
                            },
                        });
                    }}
                    className="fh-card space-y-4 p-5 lg:col-span-2"
                >
                    <h2 className="font-bold text-brand-950">{t('users.edit')}</h2>

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
                            <InputLabel value={t('common.currency')} />
                            <TextInput className="fh-input mt-1 block w-full" value={form.data.currency} onChange={(e) => form.setData('currency', e.target.value)} />
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
                            <InputLabel value={t('users.new_password')} />
                            <TextInput type="password" className="fh-input mt-1 block w-full" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} />
                            <InputError message={form.errors.password} className="mt-1" />
                        </div>
                        <div>
                            <InputLabel value={t('common.confirm_password')} />
                            <TextInput type="password" className="fh-input mt-1 block w-full" value={form.data.password_confirmation} onChange={(e) => form.setData('password_confirmation', e.target.value)} />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="fh-btn-primary" disabled={form.processing}>
                            {t('common.save_changes')}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
