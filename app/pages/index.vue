<script setup lang="ts">
import redirect from '@/middleware/redirect';

definePageMeta({
    middleware: redirect,
});
</script>
