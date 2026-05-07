<script lang="ts">
    import { ArtefactTypeEnum, PhysicalMediaTypeEnum, type Artefact } from "$lib/schemas/artefact";
    import Blockquote from "../Blockquote.svelte";
    let { data = $bindable() }: { data: Artefact } = $props();

    function formatBytes(bytes: number) {
        if (!bytes) return "0 B";
        const k = 1024;
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }
</script>

<form class="form m-2 space-y-2 rounded-container border border-surface-500 p-4">
    <div>Název</div>
    <input class="input" type="text" bind:value={data.label} />

    <div>Kvalita</div>
    <input class="input" type="text" bind:value={data.quality} />

    <div>URL webu</div>
    <input class="input" type="text" bind:value={data.websiteUrl} />

    <div>Interní poznámka</div>
    <input class="input" type="text" bind:value={data.internalNote} />
    
    <div>Typ objektu</div>
    {#if data.physicalMediaType === PhysicalMediaTypeEnum.None}
        <select bind:value={data.type} class="select">
            {#each Object.entries(ArtefactTypeEnum) as enumValue}
                <option value={enumValue[1]}>{enumValue[0]}</option>
            {/each}
        </select>
    {:else}
        <Blockquote>{data.type}</Blockquote>
    {/if}

    <div>Typ fyzického média</div>
    <Blockquote>{data.physicalMediaType}</Blockquote>

    <div>Formát</div>
    <Blockquote>{data.format}</Blockquote>

    <div>Typ digitálního objektu</div>
    <Blockquote>{data.digitalObjectType}</Blockquote>

    <div>Název souboru</div>
    <Blockquote>{data.fileName}</Blockquote>

    <div>Velikost souboru</div>
    <Blockquote>{formatBytes(data.fileSize)}</Blockquote>

    {#if data.fedoraUrl}
        <div>Fedora URL</div>
        <Blockquote>{data.fedoraUrl}</Blockquote>
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
