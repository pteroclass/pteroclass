<template>
    <USelectMenu name="role" :disabled="props.disabled">
        <USelectMenuItem value="admin" :selected="isAdminSelected"
            >Admin</USelectMenuItem
        >
        <USelectMenuItem value="teacher" :selected="isTeacherSelected"
            >Teacher</USelectMenuItem
        >
        <USelectMenuItem value="student" :selected="isStudentSelected"
            >Student</USelectMenuItem
        >
    </USelectMenu>
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
const isStudentSelected = computed(() => props.selectedRole === 'student');
const isTeacherSelected = computed(() => props.selectedRole === 'teacher');
const isAdminSelected = computed(() => props.selectedRole === 'admin');
</script>
