import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PageHeader from '@/Components/PageHeader';
import TextInput from '@/Components/TextInput';
import { useTranslation } from '@/i18n/useTranslation';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

function CategoryForm({ form, onSubmit, submitLabel }) {
    const { t } = useTranslation();
    const { data, setData, processing, errors } = form;

    return (
        <form onSubmit={onSubmit} className="fh-card mx-auto max-w-2xl space-y-5 p-6">
            <div>
                <InputLabel htmlFor="name" value={t('common.name')} />
                <TextInput
                    id="name"
                    className="fh-input mt-1 block w-full"
                    placeholder={t('income_categories.name_placeholder')}
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    required
                />
                <InputError message={errors.name} className="mt-1" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <InputLabel htmlFor="icon" value={t('common.icon')} />
                    <TextInput
                        id="icon"
                        className="fh-input mt-1 block w-full"
                        placeholder="salary"
                        value={data.icon}
                        onChange={(e) => setData('icon', e.target.value)}
                    />
                    <InputError message={errors.icon} className="mt-1" />
                </div>
                <div>
                    <InputLabel htmlFor="color" value={t('common.color')} />
                    <TextInput
                        id="color"
                        type="color"
                        className="fh-input mt-1 block h-11 w-full"
                        value={data.color}
                        onChange={(e) => setData('color', e.target.value)}
                    />
                    <InputError message={errors.color} className="mt-1" />
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Link href={route('income-categories.index')} className="fh-btn-ghost">
                    {t('common.cancel')}
                </Link>
                <button type="submit" className="fh-btn-primary" disabled={processing}>
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}

export default function Create() {
    const { t } = useTranslation();
    const form = useForm({
        name: '',
        icon: 'income',
        color: '#059669',
    });

    return (
        <AppLayout title={t('income_categories.create_title')}>
            <Head title={t('income_categories.create_title')} />
            <PageHeader title={t('income_categories.create_title')} subtitle={t('income_categories.create_subtitle')} />
            <CategoryForm
                form={form}
                submitLabel={t('income_categories.create_btn')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.post(route('income-categories.store'));
                }}
            />
        </AppLayout>
    );
}

export function Edit({ category }) {
    const { t } = useTranslation();
    const form = useForm({
        name: category.name,
        icon: category.icon || 'income',
        color: category.color || '#059669',
    });

    return (
        <AppLayout title={t('income_categories.edit_title')}>
            <Head title={t('income_categories.edit_title')} />
            <PageHeader title={t('income_categories.edit_title')} subtitle={category.name} />
            <CategoryForm
                form={form}
                submitLabel={t('common.save_changes')}
                onSubmit={(e) => {
                    e.preventDefault();
                    form.put(route('income-categories.update', category.id));
                }}
            />
        </AppLayout>
    );
}
