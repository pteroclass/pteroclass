import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2026-01-05',
    modules: ['@nuxt/ui'],
    vite: {
        plugins: [tailwindcss()],
    },
});
