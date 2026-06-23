<script lang="ts">
    import type { PlayableObject } from "$lib/schemas/playableObject";
    import Blockquote from "../Blockquote.svelte";
    let { data = $bindable() }: { data: PlayableObject } = $props();
</script>

<form class="form flex flex-col card preset-outlined-surface-300-700 p-4">
    <div>Název</div>
    <input class="input" type="text" bind:value={data.label} />

    <div>Poznámka</div>
    <input class="input" type="text" bind:value={data.note} />

    <div>Emulátor</div>
    <Blockquote>{data.emulatorSlug}</Blockquote>

    {#if data.creationDate}
        <div>Datum vytvoření</div>
        <Blockquote>{data.creationDate}</Blockquote>
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
