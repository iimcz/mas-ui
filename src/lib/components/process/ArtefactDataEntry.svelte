<script lang="ts">
    import { PhysicalMediaStateEnum, type Artefact } from "$lib/schemas/artefact";
    import Blockquote from "../Blockquote.svelte";
    let { data = $bindable() }: { data: Artefact } = $props();
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container">
    <div>Název</div>
    <input class="input" type="text" bind:value={data.label} />

    <div>Stav nosiče</div>
    <select bind:value={data.physicalMediaState} class="select">
        {#each Object.entries(PhysicalMediaStateEnum) as enumValue}
            <option value={enumValue[1]}>{enumValue[0]}</option>
        {/each}
    </select>

    <div>Typ</div>
    <Blockquote>{data.type}</Blockquote>

    <div>Interní poznámka</div>
    <input class="input" type="text" bind:value={data.internalNote} />
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
