import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-01-10',
    modules: ['@nuxt/ui', '@nuxthub/core'],
    vite: {
        plugins: [tailwindcss()],
    },
    hub: {
        db: 'mysql',
    },
});
