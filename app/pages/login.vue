<script setup lang="ts">
useHead({
    title: 'User - Login',
});
const formState = reactive<LoginSchema>({
    email: '',
    password: '',
});
const onSubmit = async () => {
    if (loginZodSchema.safeParse(formState)) {
        const { data } = await useFetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formState),
        });
        if (data.value.needsVerification) {
            await navigateTo('/change-password');
        } else if (data.value.success) {
            await navigateTo('/dashboard');
        }
    }
};
</script>
<template>
    <UForm
        class="flex flex-col gap-y-2"
        :schema="loginZodSchema"
        :state="formState"
        @submit="onSubmit"
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
