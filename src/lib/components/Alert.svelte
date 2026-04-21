<script lang="ts">
    import type { Snippet } from "svelte";

    let { children, class: className }: { children: Snippet; class?: string } = $props();
</script>

<div class="grid grid-cols-1 items-center gap-4 card p-4 lg:grid-cols-[auto_1fr_auto] {className}">
    {@render children()}
</div>
