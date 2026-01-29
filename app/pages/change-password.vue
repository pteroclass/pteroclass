<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useHead({
    title: 'User - Change Password',
});
const formState = reactive<ChangePasswordSchema>({
    password: '',
});
const { user } = useUserSession();
const onSubmit = async (e: FormSubmitEvent<ChangePasswordSchema>) => {
    const res = await $fetch('/api/change-password', {
        method: 'POST',
        body: {
            email: user.value?.email,
            ...e.data,
        },
    });
    if (res.success) {
        await navigateTo('/dashboard');
    }
};
</script>

<template>
    <UContainer class="flex flex-col items-center gap-y-2">
        <UForm
            class="flex flex-col gap-y-2"
            :schema="changePasswordZodSchema"
            :state="formState"
            @submit.prevent="onSubmit"
        >
            <UFormField label="password" name="password" size="lg" required>
                <UInput type="password" v-model="formState.password" />
            </UFormField>
            <UButton
                type="submit"
                class="inline-flex cursor-pointer justify-center"
                >Change</UButton
            >
        </UForm>
    </UContainer>
</template>
