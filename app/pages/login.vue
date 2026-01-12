<template>
    <UForm class="flex flex-col gap-y-2" method="POST" action="/api/login">
        <UFormField label="email" name="email" size="lg" required>
            <UInput type="email" />
        </UFormField>
        <UFormField label="password" name="password" size="lg" required>
            <UInput type="password" />
        </UFormField>
        <UButton type="submit" class="inline-flex cursor-pointer justify-center"
            >Login</UButton
        >
    </UForm>
</template>
