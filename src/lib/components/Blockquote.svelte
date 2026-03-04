<script lang="ts">
    import type { Snippet } from "svelte";
    let { children }: { children: Snippet } = $props();
</script>

<div class="flex ml-2">
    <div class="bg-surface-900-100 min-w-1 mr-2 min-h-lh rounded-full"></div>
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
