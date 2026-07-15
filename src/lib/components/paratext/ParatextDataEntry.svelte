<script lang="ts">
    import type { Paratext } from "$lib/schemas/paratext";
    import { faFile, faTrash } from "@fortawesome/free-solid-svg-icons";
    import { FileUpload } from "@skeletonlabs/skeleton-svelte";
    import type { FileChangeDetails } from "@zag-js/file-upload";
    import Fa from "svelte-fa";
    import Blockquote from "../Blockquote.svelte";

    function onChangeHandler(e: FileChangeDetails) {
        file = e.acceptedFiles[0];
    }

    let { data = $bindable() }: { data: Partial<Paratext> } = $props();
    let file = $state(null as File | null);
</script>

<div class="form m-2 flex flex-col space-y-2 card preset-outlined-surface-300-700 p-4">
    <input name="id" type="hidden" bind:value={data.id} />

    <div>Kurátorský popis</div>
    <div class="input-group-divider input-group">
        <input class="input" name="name" type="text" bind:value={data.label} />
    </div>

    <div>Jazyk</div>
    <div class="input-group-divider input-group">
        <input class="input" name="language" type="text" bind:value={data.language} />
    </div>

    <div>Datum</div>
    <div class="input-group-divider input-group">
        <input class="input" name="date" type="text" bind:value={data.date} />
    </div>

    <div>Interní poznámka</div>
    <div class="input-group-divider input-group">
        <input class="input" name="internalNote" type="text" bind:value={data.internalNote} />
    </div>

    <div>Vyplněno</div>
    <div class="input-group-divider input-group">
        <input class="input" name="filledOutBy" type="text" bind:value={data.filledOutBy} />
    </div>

    <div>URL Stránky</div>
    <div class="input-group-divider input-group">
        <input class="input" name="websiteUrl" type="text" bind:value={data.websiteUrl} />
    </div>

    <div>Velikost</div>
    <div class="input-group-divider input-group">
        <input class="input" name="emissionSize" type="text" bind:value={data.emissionSize} />
    </div>

    <div>Identifikační číslo</div>
    <div class="input-group-divider input-group">
        <input
            class="input"
            name="identificationNumber"
            type="text"
            bind:value={data.identificationNumber}
        />
    </div>

    <div>Typ paratextu</div>
    <Blockquote>{data.paratextType}</Blockquote>

    <div>Importováno</div>
    <Blockquote
        >{data.importedAt == null ? "" : new Date(data.importedAt).toLocaleString()}</Blockquote
    >

    <div>Exportováno</div>
    <Blockquote
        >{data.exportedAt == null || data.exportedAt === "0001-01-01T00:00:00"
            ? ""
            : new Date(data.exportedAt).toLocaleString()}</Blockquote
    >

    <!--
    <div>Soubor</div>
    <FileUpload name="files" onFileChange={onChangeHandler}>
        <FileUpload.Dropzone>
            <Fa icon={faFile} />
            <span>Klikněte pro nahrání nebo přetáhněte soubor.</span>
            <FileUpload.Trigger>Procházet soubory</FileUpload.Trigger>
            <FileUpload.HiddenInput />
        </FileUpload.Dropzone>
        <FileUpload.ItemGroup>
            <FileUpload.Context>
                {#snippet children(fileUpload)}
                    {#each fileUpload().acceptedFiles as file (file.name)}
                        <FileUpload.Item {file}>
                            <FileUpload.ItemName
                                >{file.name}</FileUpload.ItemName
                            >
                            <FileUpload.ItemSizeText
                                >{file.size} bytes</FileUpload.ItemSizeText
                            >
                            <FileUpload.ItemDeleteTrigger />
                        </FileUpload.Item>
                    {/each}
                {/snippet}
            </FileUpload.Context>
        </FileUpload.ItemGroup>
        <FileUpload.ClearTrigger>Zrušit výběr</FileUpload.ClearTrigger>
    </FileUpload>
    -->
</div>
