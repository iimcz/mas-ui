<script>
    import { faClose, faFile, faUpload } from '@fortawesome/free-solid-svg-icons';
    import { Dialog, FileUpload, Portal, Progress } from '@skeletonlabs/skeleton-svelte';
    import Fa from 'svelte-fa';

    const animation = 'transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0';

    let selected = $state(false);
    let uploading = $state(false);
    let val = $state(0);

    function onChangeHandler() {
        selected = true;
    }

    function onFormSubmit() {
        uploading = true;
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
                Nahrajte existující soubor s autodetekcí formátu
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
                        <Progress value={val} class="grid grid-cols-[auto_1fr] items-center gap-4">
                            <Progress.Label class="text-sm">{val}%</Progress.Label>
                            <Progress.Track>
                                <Progress.Range />
                            </Progress.Track>
                        </Progress>
                    {:else}
                        <FileUpload name="files" onchange={onChangeHandler}>
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
            <footer class="flex justify-end gap-2">
                <Dialog.CloseTrigger class="btn preset-tonal">Zrušit</Dialog.CloseTrigger>
                <button disabled={!selected && !uploading} class="btn preset-filled" onclick={onFormSubmit}>Nahrát</button>
            </footer>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
