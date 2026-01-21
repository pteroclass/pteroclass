<script setup lang="ts">
useHead({
    title: 'Admin - Register',
});
const formState = reactive<AdminSchema>({
    email: '',
    password: '',
    role: 'admin',
    verified: 'Yes',
});
const router = useRouter();
const isVerified = computed(() => formState.verified == 'Yes');
const onSubmit = async () => {
    if (adminZodSchema.safeParse(formState)) {
        const res = await useFetch('/api/admin/register', {
            method: 'POST',
            body: JSON.stringify(formState),
        });
        if (res.status.value == 'success') {
            await router.push('/admin/dashboard');
        }
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
                        disabled
                    />
                </UFormField>
                <UFormField class="w-full" label="verified" required>
                    <USelect
                        class="w-full"
                        v-model="formState.verified"
                        name="verified"
                        :items="['Yes', 'No']"
                        defaultValue="Yes"
                    ></USelect>
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
    </UContainer>
</template>
