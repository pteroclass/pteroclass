<template>
    <Head>
        <Meta charset="UTF-8" />
        <Meta name="viewport" content="width=device-width" />
        <Link rel="icon" href="/favicon.ico" />
    </Head>
    <Body class="flex h-screen flex-col justify-center">
        <UContainer class="flex flex-col items-center">
            <NuxtPage />
        </UContainer>
    </Body>
</template>

<script setup lang="ts">
import '@/styles/global.css';
</script>
