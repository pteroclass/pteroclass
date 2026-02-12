<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useHead({
    title: 'User - Login',
});
const formState = reactive<LoginSchema>({
    email: '',
    password: '',
});
const onSubmit = async (e: FormSubmitEvent<LoginSchema>) => {
    const res = await $fetch('/api/login', {
        method: 'POST',
        body: e.data,
        ignoreResponseError: true,
    });
    if (res.success) {
        await navigateTo('/dashboard');
    }
};
</script>
<template>
    <UForm
        class="flex flex-col gap-y-2"
        :schema="loginZodSchema"
        :state="formState"
        @submit.prevent="onSubmit"
    >
        <UFormField label="email" name="email" size="lg" required>
            <UInput type="email" v-model="formState.email" />
        </UFormField>
        <UFormField label="password" name="password" size="lg" required>
            <UInput type="password" v-model="formState.password" />
        </UFormField>
        <UButton type="submit" class="inline-flex cursor-pointer justify-center"
            >Login</UButton
        >
    </UForm>
</template>
