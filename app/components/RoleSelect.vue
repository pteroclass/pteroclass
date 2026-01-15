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
        selectedRole?: 'admin' | 'teacher' | 'student';
    }>(),
    {
        disabled: false,
        selectedRole: 'student',
    },
);
const items = ['admin', 'teacher', 'student'];
</script>
