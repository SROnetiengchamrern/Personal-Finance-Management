import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function TransactionForm({ form, wallets, incomeCategories, expenseCategories, onSubmit, submitLabel }) {
    const { t } = useTranslation();
    const { data, setData, processing, errors } = form;
    const categories = data.type === 'income' ? incomeCategories : expenseCategories;

    return (
        <form onSubmit={onSubmit} className="fh-card mx-auto max-w-2xl space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.type')} />
                    <select className="fh-input mt-1" value={data.type} onChange={(e) => setData({ ...data, type: e.target.value, category_id: '' })}>
                        <option value="income">{t('transactions.income')}</option>
                        <option value="expense">{t('transactions.expense')}</option>
                    </select>
                    <InputError message={errors.type} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.date')} />
                    <TextInput type="date" className="fh-input mt-1 block w-full" value={data.transaction_date} onChange={(e) => setData('transaction_date', e.target.value)} required />
                    <InputError message={errors.transaction_date} className="mt-1" />
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel value={t('common.wallet')} />
                    <select className="fh-input mt-1" value={data.wallet_id} onChange={(e) => setData('wallet_id', e.target.value)} required>
                        <option value="">{t('transactions.select_wallet')}</option>
                        {wallets.map((w) => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                        ))}
                    </select>
                    <InputError message={errors.wallet_id} className="mt-1" />
                </div>
                <div>
                    <InputLabel value={t('common.category')} />
                    <select className="fh-input mt-1" value={data.category_id || ''} onChange={(e) => setData('category_id', e.target.value)}>
                        <option value="">{t('common.none')}</option>
                        {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} className="mt-1" />
                </div>
            </div>

            <div>
                <InputLabel value={t('common.amount')} />
                <TextInput type="number" step="0.01" min="0.01" className="fh-input mt-1 block w-full" value={data.amount} onChange={(e) => setData('amount', e.target.value)} required />
                <InputError message={errors.amount} className="mt-1" />
            </div>

            <div>
                <InputLabel value={t('common.note')} />
                <textarea className="fh-input mt-1" rows="3" value={data.note || ''} onChange={(e) => setData('note', e.target.value)} />
                <InputError message={errors.note} className="mt-1" />
            </div>

            <div className="flex justify-end gap-2">
                <Link href={route('transactions.index')} className="fh-btn-ghost">{t('common.cancel')}</Link>
                <button type="submit" className="fh-btn-primary" disabled={processing}>{submitLabel}</button>
            </div>
        </form>
    );
}

export default function Create({ wallets, incomeCategories, expenseCategories }) {
    const { t } = useTranslation();
    const form = useForm({
        type: 'expense',
        wallet_id: wallets[0]?.id || '',
        category_id: '',
        amount: '',
        note: '',
        transaction_date: new Date().toISOString().slice(0, 10),
    });

    return (
        <AppLayout title={t('transactions.create_title')}>
            <Head title={t('transactions.create_title')} />
            <PageHeader title={t('transactions.create_title')} subtitle={t('transactions.create_subtitle')} />
            <TransactionForm
                form={form}
                wallets={wallets}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                submitLabel={t('transactions.save')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('transactions.store'));
                }}
            />
        </AppLayout>
    );
}

export function EditPage({ transaction, wallets, incomeCategories, expenseCategories }) {
    const { t } = useTranslation();
    const form = useForm({
        type: transaction.type,
        wallet_id: transaction.wallet_id,
        category_id: transaction.category_id || '',
        amount: transaction.amount,
        note: transaction.note || '',
        transaction_date: String(transaction.transaction_date).slice(0, 10),
    });

    return (
        <AppLayout title={t('transactions.edit_title')}>
            <Head title={t('transactions.edit_title')} />
            <PageHeader title={t('transactions.edit_title')} />
            <TransactionForm
                form={form}
                wallets={wallets}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                submitLabel={t('transactions.update')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('transactions.update', transaction.id));
                }}
            />
        </AppLayout>
    );
}
