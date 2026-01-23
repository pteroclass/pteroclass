export default defineEventHandler(async (e) => {
    const { success } = await $fetch('/api/admin/exists');
    if (success) {
        return sendRedirect(e, '/login');
    }
    return sendRedirect(e, '/admin/register');
});
