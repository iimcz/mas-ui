<script lang="ts">
    import type { Snippet } from "svelte";
    let {
        children,
        title,
        class: className
    }: { children: Snippet; title: string; class?: string } = $props();
</script>

<div class="container h-full">
    <div class="mx-4 flex h-full w-5/6 flex-col space-y-5 {className}">
        <h1 class="mt-8 text-3xl">{title}</h1>
        {@render children?.()}
        <div class="mb-4"></div>
    </div>
</div>
