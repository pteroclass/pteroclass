<template>
    <USelect
        name="verified"
        :disabled="props.disabled"
        :items="items"
        :defaultValue="props.selectedVerified"
    />
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        selectedVerified?: 'Yes' | 'No';
    }>(),
    {
        disabled: false,
        selectedVerified: 'Yes',
    },
);
const items = ['Yes', 'No'];
</script>

