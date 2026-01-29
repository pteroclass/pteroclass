<template>
    <USelect
        name="role"
        :disabled="props.disabled"
        :items="items"
        :defaultValue="props.selectedRole"
    />
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        selectedRole?: Role;
    }>(),
    {
        disabled: false,
        selectedRole: 'student',
    },
);
const items = zodRoleEnum.options;
</script>
