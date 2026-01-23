<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useHead({
    title: 'Admin - Register',
});
const formState = reactive<AdminSchema>({
    email: '',
    password: '',
    role: 'admin',
    verified: 'Yes',
});
const isVerified = computed(() => formState.verified == 'Yes');
const isAdmin = computed(() => formState.role == 'admin');
const onSubmit = async (e: FormSubmitEvent<AdminSchema>) => {
    const { data } = await useFetch('/api/admin/register', {
        method: 'POST',
        body: JSON.stringify(e.data),
    });
    if (data.value?.needsVerification) {
        await navigateTo('/change-password');
    } else if (data.value?.success) {
        await navigateTo('/admin/dashboard');
    }
};
</script>

<template>
    <UContainer class="flex flex-col items-center gap-y-2">
        <UForm
            class="flex flex-col gap-y-2"
            :schema="adminZodSchema"
            :state="formState"
            @submit="onSubmit"
        >
            <UFieldGroup class="gap-x-2">
                <UFormField label="email" name="email" size="lg" required>
                    <UInput type="email" v-model="formState.email" />
                </UFormField>
                <UFormField label="password" name="password" size="lg" required>
                    <UInput type="password" v-model="formState.password" />
                </UFormField>
            </UFieldGroup>
            <UFieldGroup class="gap-x-2">
                <UFormField class="w-full" label="role" required>
                    <RoleSelect
                        class="w-full"
                        v-model="formState.role"
                        selectedRole="admin"
                    />
                </UFormField>
                <UFormField class="w-full" label="verified" required>
                    <VerifiedSelect
                        class="w-full"
                        v-model="formState.verified"
                        selectedVerified="Yes"
                    />
                </UFormField>
            </UFieldGroup>
            <UButton
                type="submit"
                class="inline-flex cursor-pointer justify-center"
                >Register</UButton
            >
        </UForm>
        <UAlert
            v-if="!isVerified"
            class="w-fit"
            color="warning"
            variant="subtle"
            title="If verified is set to false, it will be asked to change the password on the next step..."
        />
        <UAlert
            v-if="!isAdmin"
            class="w-fit"
            color="warning"
            variant="subtle"
            title="You can create a normal user here, but it is not recommended, you will need to create another admin user then..."
        />
    </UContainer>
</template>
