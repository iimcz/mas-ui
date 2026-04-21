<script lang="ts">
    import type { Snippet } from "svelte";
    let { children }: { children: Snippet } = $props();
</script>

<div class="ml-2 flex">
    <div class="mr-2 min-h-lh min-w-1 rounded-full bg-surface-900-100"></div>
    <div class="content">
        {@render children()}
    </div>
</div>

<style scoped>
    @reference "#layout.css";

    .content:empty::after {
        @apply text-surface-700-300;
        content: "(Žádná data)";
    }
</style>
