<template>
    <USelect
        name="days"
        :disabled="props.disabled"
        :items="items"
        :defaultValue="props.selectedDays"
    />
</template>
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        disabled?: boolean;
        selectedDays?: Days;
    }>(),
    {
        disabled: false,
        selectedDays: '21 days',
    },
);
const items = zodDaysEnum.options;
</script>
