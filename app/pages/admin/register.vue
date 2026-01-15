<template>
    <UContainer class="flex flex-col items-center gap-y-2">
        <UForm
            class="flex flex-col gap-y-2"
            method="POST"
            action="/api/admin/register"
        >
            <UFieldGroup class="gap-x-2">
                <UFormField label="email" name="email" size="lg" required>
                    <UInput type="email" />
                </UFormField>
                <UFormField label="password" name="password" size="lg" required>
                    <UInput type="password" />
                </UFormField>
            </UFieldGroup>
            <UFieldGroup class="gap-x-2">
                <UFormField class="w-full" label="role" required>
                    <RoleSelect class="w-full" selectedRole="admin" disabled />
                </UFormField>
                <UFormField class="w-full" label="verified" required>
                    <USelect
                        class="w-full"
                        v-model="verified"
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
<script setup lang="ts">
const verified = ref('Yes');
const isVerified = computed(() => verified.value == 'Yes');
</script>
