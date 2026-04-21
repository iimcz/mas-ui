<script lang="ts">
    import type { GamePackage } from "$lib/schemas/gamePackage";
    import Blockquote from "../Blockquote.svelte";
    let { data = $bindable() }: { data: GamePackage } = $props();
</script>

<form class="form m-2 space-y-2 rounded-container border border-surface-500 p-4">
    <div>Název</div>
    <input class="input" type="text" bind:value={data.name} />

    {#if data.conversionDate}
        <div>Datum konverze</div>
        <Blockquote>{data.conversionDate}</Blockquote>
    {/if}
</form>

<style scoped>
    @reference "#layout.css";

    .form > *:nth-child(2n + 1) {
        @apply mt-4 text-lg;
    }

    .form > *:nth-child(1) {
        @apply mt-0;
    }
</style>
