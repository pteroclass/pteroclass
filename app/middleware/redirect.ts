export default defineNuxtRouteMiddleware(async () => {
    const { data: success } = await useFetch('/api/admin/exists');
    if (success.value) {
        return navigateTo('/login');
    }
    return navigateTo('/admin/register');
});
