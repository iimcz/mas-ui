<script>
    import { faTrash } from '@fortawesome/free-solid-svg-icons';
    import { FileDropzone } from '@skeletonlabs/skeleton';
    import Fa from 'svelte-fa';

    function removeFile() {
        files = undefined;
    }

    /** @type {import("$lib/schemas/paratext").Paratext} */
    export let data;

    /** @type {boolean} */
    export let canUpload;

    /** @type {FileList | undefined} */
    let files;
</script>

<div class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <input name="id" type="hidden" bind:value={data.id} />
    <input name="workId" type="hidden" bind:value={data.workId} />
    <input name="versionId" type="hidden" bind:value={data.versionId} />
    <input name="packageId" type="hidden" bind:value={data.packageId} />

    <p>Název</p>
    <div class="input-group input-group-divider">
        <input name="name" type="text" bind:value={data.name} />
    </div>
    <p>Popis</p>
    <div class="input-group input-group-divider">
        <input name="description" type="text" bind:value={data.description} />
    </div>
    <p>Popis Zdroj</p>
    <div class="input-group input-group-divider">
        <input name="source" type="text" bind:value={data.source} />
    </div>
    <p>URL Zdroje</p>
    <div class="input-group input-group-divider">
        <input name="sourceUrl" type="text" bind:value={data.sourceUrl} />
    </div>
    <p>Soubor</p>
    {#if canUpload}
        <FileDropzone class={(files == undefined ? "" : "hidden")} bind:files={files} name="file">
            <svelte:fragment slot="message"><b>Nahrajte soubor</b> kliknutím nebo přetažením</svelte:fragment>
        </FileDropzone>
        {#if files != undefined}
            <div class="card textarea flex gap-2 items-center justify-center p-4">
                <span>{files[0]?.name}</span>
                <button on:click={removeFile} class="btn-icon bg-error-500 variant-filled"><Fa icon={faTrash}/></button>
            </div>
        {/if}
    {:else}
        <div class="card p-4 bg-surface-300 flex justify-center align-center">
            Po nahrání paratextu již nelze soubor změnit
        </div>
    {/if}
</div>
