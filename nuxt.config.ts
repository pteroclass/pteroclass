import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-02-20',
    modules: ['@nuxt/ui', '@nuxthub/core', 'nuxt-auth-utils'],
    vite: {
        plugins: [tailwindcss()],
    },
    hub: {
        db: 'mysql',
    },
});
