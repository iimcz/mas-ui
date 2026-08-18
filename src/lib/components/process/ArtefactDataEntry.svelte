<script lang="ts">
    import {
        ArtefactTypeEnum,
        PhysicalMediaTypeEnum,
        ArtefactFormatEnum,
        type Artefact
    } from "$lib/schemas/artefact";
    import { formatBytes } from "$lib/util/stringFormat";
    import Blockquote from "../Blockquote.svelte";
    let { data = $bindable() }: { data: Artefact } = $props();

    const parsedInfo = JSON.parse(data.mediaInfoReport);
    const formattedInfo = JSON.stringify(parsedInfo, null, 2);
</script>

<form class="form m-2 space-y-2 rounded-container border border-surface-500 p-4">
    <div>Preferovené označení</div>
    <input class="input" type="text" bind:value={data.label} />

    <div>Verze</div>
    <input class="input" type="text" bind:value={data.version} />

    <div>Název souboru</div>
    <Blockquote>{data.fileName}</Blockquote>

    {#if data.repoUrl}
        <div>Repository object ID</div>
        <Blockquote>{data.repoUrl}</Blockquote>
    {/if}

    <div>Typ digitálního objektu</div>
    <Blockquote>{data.digitalObjectType}</Blockquote>

    <div>Formát</div>
    <select bind:value={data.format} class="select">
        {#each Object.entries(ArtefactFormatEnum) as enumValue}
            <option value={enumValue[1]}>{enumValue[0]}</option>
        {/each}
    </select>

    <div>Velikost souboru</div>
    <Blockquote>{formatBytes(data.fileSize)}</Blockquote>

    <div>MediaInfo report</div>
    <Blockquote>
        <pre>{formattedInfo}</pre>
    </Blockquote>

    <div>Služební poznámka</div>
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
