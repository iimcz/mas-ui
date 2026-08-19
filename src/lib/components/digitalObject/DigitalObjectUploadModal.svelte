<script lang="ts">
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { faClose, faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
    import { toaster } from "$lib/toaster";
    import { DigitalObjectType } from "$lib/schemas/digitalObject";
    import Fa from "svelte-fa";
    import * as tus from "tus-js-client";

    const animation =
        "transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0";

    let { onSuccess }: { onSuccess: () => void } = $props();

    let label = $state("");
    let version = $state("");
    let digitalObjectType = $state<keyof typeof DigitalObjectType>("Modification");
    let selectedFile: File | null = $state(null);
    let fileInput: HTMLInputElement;

    let uploading = $state(false);
    let progress = $state(0);

    const uploadableTypes = ["Modification", "UnplayableParatext"] as const;

    const digitalObjectTypeLabels: Record<keyof typeof DigitalObjectType, string> = {
        GameArtefact: "Artefakt",
        PlayableObject: "Hratelný objekt",
        Modification: "Modifikace",
        UnplayableParatext: "Nehratelný paratext"
    };

    function handleFileChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0] ?? null;
        if (file) {
            selectedFile = file;
        }
    }

    function handleUpload() {
        if (!selectedFile) return;

        const metadata = {
            digitalObjectInfo: JSON.stringify({
                label,
                version,
                fileName: selectedFile.name,
                digitalObjectType:
                    DigitalObjectType[digitalObjectType as keyof typeof DigitalObjectType]
            })
        };

        uploading = true;
        progress = 0;

        const upload = new tus.Upload(selectedFile, {
            endpoint: `${API_URL}/api/v1/digitalobjects/upload`,
            metadata,
            onProgress: (bytesSent, bytesTotal) => {
                progress = Math.round((bytesSent / bytesTotal) * 100);
            },
            onSuccess: () => {
                toaster.success({ title: "Digitální objekt byl nahrán" });
                label = "";
                version = "";
                selectedFile = null;
                digitalObjectType = "Modification";
                uploading = false;
                progress = 0;
                fileInput.files = null;
                onSuccess();
            },
            onError: (e) => {
                toaster.error({ title: "Nahrání se nezdařilo", description: e });
                uploading = false;
                progress = 0;
            },
            retryDelays: [0, 1000, 3000, 5000]
        });

        upload.start();
    }
</script>

<Dialog>
    <Dialog.Trigger class="btn preset-filled">
        <Fa icon={faUpload} />
        Nahrát nový digitální objekt
    </Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
        <Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content
                class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl {animation}"
            >
                <header class="flex items-center justify-between">
                    <Dialog.Title class="text-lg font-bold">Nahrát digitální objekt</Dialog.Title>
                    <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                        <Fa icon={faClose} />
                    </Dialog.CloseTrigger>
                </header>
                <Dialog.Description>
                    <form class="form space-y-4">
                        <label class="label">
                            <span class="label-text">Typ digitálního objektu</span>
                            <select class="select" bind:value={digitalObjectType}>
                                {#each uploadableTypes as type}
                                    <option value={type}>{digitalObjectTypeLabels[type]}</option>
                                {/each}
                            </select>
                        </label>

                        <label class="label">
                            <span class="label-text">Kurátorský popis</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="Popis"
                                bind:value={label}
                            />
                        </label>

                        <label class="label">
                            <span class="label-text">Verze</span>
                            <input
                                class="input"
                                type="text"
                                placeholder="Verze"
                                bind:value={version}
                            />
                        </label>

                        <label class="label">
                            <span class="label-text">Soubor</span>
                            <input
                                class="input"
                                type="file"
                                bind:this={fileInput}
                                onchange={handleFileChange}
                            />
                        </label>
                    </form>
                </Dialog.Description>
                {#if uploading}
                    <div class="space-y-2">
                        <progress class="progress" value={progress} max="100"></progress>
                        <p class="text-center text-sm opacity-60">{progress}%</p>
                    </div>
                {/if}
                <footer class="flex justify-end gap-2">
                    <Dialog.CloseTrigger disabled={uploading} class="btn preset-tonal"
                        >Zrušit</Dialog.CloseTrigger
                    >
                    <button
                        disabled={uploading || !selectedFile}
                        class="btn preset-filled"
                        onclick={handleUpload}
                    >
                        {#if uploading}
                            <Fa icon={faSpinner} class="animate-spin" />
                            Nahrávám…
                        {:else}
                            Nahrát
                        {/if}
                    </button>
                </footer>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
