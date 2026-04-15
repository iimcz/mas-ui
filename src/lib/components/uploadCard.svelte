<script lang="ts">
    import { ArtefactTypeEnum, type Artefact } from '$lib/schemas/artefact';
    import { PUBLIC_API_URL as API_URL } from '$env/static/public';
    import { faCheck, faClock, faClose, faFile, faUpload } from '@fortawesome/free-solid-svg-icons';
    import { Dialog, FileUpload, Portal, Progress } from '@skeletonlabs/skeleton-svelte';
    import { type FileChangeDetails } from '@zag-js/file-upload';
    import Fa from 'svelte-fa';
    import { page } from '$app/state';
    import { goto } from '$app/navigation';

    const animation = 'transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0';

    let selected = $state(false);
    let uploading = $state(false);
    let label = $state("");
    let uploadStep = $state(0);
    let artefactType: ArtefactTypeEnum = $state(ArtefactTypeEnum.IsoImage);
    let acceptedFile: File | null = $state(null);

    function onChangeHandler(e: FileChangeDetails) {
        selected = true;
        acceptedFile = e.acceptedFiles[0]
    }

    async function onFormSubmit() {
        if (acceptedFile == null) return;
        uploading = true;

        const formData  = new FormData();
        formData.append("file", acceptedFile)

        const headers = new Headers();
        headers.append("VersionId", page.params.version!);

        const reqStart = await fetch(`${API_URL}/api/v1/upload/start`, {
            method: "POST",
            body: formData,
            headers
        })

        uploadStep = 1;
        await new Promise(resolve => setTimeout(resolve, 500));

        const process = await reqStart.json();
        const artefact: Partial<Artefact> = {
            label,
            type: artefactType
        }

        const reqFinish = await fetch(`${API_URL}/api/v1/upload/${process.processId}/finalize`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(artefact)
        })

        uploadStep = 2;

        const result = await reqFinish.json();
        goto(`/work/${page.params.work}/version/${page.params.version}/artefact/${result.id}`)
	}
</script>

<Dialog>
    <Dialog.Trigger class="card transition-transform preset-outlined-primary-300-700 p-4 hover:scale-105 flex gap-2">
        <div class="flex justify-center items-center mr-4 ml-2">
            <Fa size="lg" scale="2" class="w-full" icon={faUpload}/>
        </div>
        <div class="text-left">
            <div class="text-lg font-bold">Nahrát soubor</div>
            <div>
                Nahrajte existující soubor
            </div>
        </div>
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
        <Dialog.Positioner class="fixed inset-0 z-50 flex justify-center items-center p-4">
        <Dialog.Content class="card bg-surface-100-900 w-full max-w-xl p-4 space-y-4 shadow-xl {animation}">
            <header class="flex justify-between items-center">
                <Dialog.Title class="text-lg font-bold">Nahrát soubor</Dialog.Title>
                <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                    <Fa icon={faClose} />
                </Dialog.CloseTrigger>
            </header>
            <Dialog.Description>
                <form class="form">
                    {#if uploading}
                        <div class="flex font-semibold flex-col gap-4 pb-4">
                            <div class="flex items-center gap-2">
                                <span class="text-nowrap">Nahrávání souboru na server</span>
                                {#if uploadStep == 0}
                                    <Progress value={null} class="grid grid-cols-[auto_1fr] items-center gap-4">
                                        <Progress.Circle  class="[--size:--spacing(8)]">
                                            <Progress.CircleTrack />
                                            <Progress.CircleRange />
                                        </Progress.Circle>
                                    </Progress>
                                {:else}
                                    <Fa class="mx-2" scale={2} icon={faCheck}/>
                                {/if}
                            </div>
                            <hr class="disabled"/>
                            <div class:disabled={uploadStep < 1} class="flex items-center gap-2">
                                <span class="text-nowrap">Ukládání souboru na úložiště</span>
                                {#if uploadStep == 0}
                                    <Fa class="mx-2" scale={2} icon={faClock}/>
                                {/if}

                                {#if uploadStep == 1}
                                    <Progress value={null} class="grid grid-cols-[auto_1fr] items-center gap-4">
                                        <Progress.Circle  class="[--size:--spacing(8)]">
                                            <Progress.CircleTrack />
                                            <Progress.CircleRange />
                                        </Progress.Circle>
                                    </Progress>
                                {/if}

                                {#if uploadStep == 2}
                                    <Fa class="mx-2" scale={2} icon={faCheck}/>
                                {/if}
                            </div>
                        </div>
                    {:else}
                        <label class="label mb-2">
                            <span class="label-text">Popis</span>
                            <input class="input" type="text" placeholder="Popis" bind:value={label} />
                        </label>
                        <label for="ArtefactType">Typ média</label>
                        <select name="ArtefactType" bind:value={artefactType} class="select mb-2">
                            {#each Object.entries(ArtefactTypeEnum) as type}
                                <option value={type[1]}>{type[0]}</option>
                            {/each}
                        </select>
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
                                            <FileUpload.ItemName>{file.name}</FileUpload.ItemName>
                                            <FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
                                            <FileUpload.ItemDeleteTrigger />
                                        </FileUpload.Item>
                                    {/each}
                                {/snippet}
                            </FileUpload.Context>
                        </FileUpload.ItemGroup>
                        <FileUpload.ClearTrigger>Zrušit výběr</FileUpload.ClearTrigger>
                        </FileUpload>
                    {/if}
                </form>
            </Dialog.Description>
            {#if !uploading}
            <footer class="flex justify-end gap-2">
                <Dialog.CloseTrigger class="btn preset-tonal">Zrušit</Dialog.CloseTrigger>
                <button disabled={!selected && !uploading} class="btn preset-filled" onclick={onFormSubmit}>Nahrát</button>
            </footer>
            {/if}
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
