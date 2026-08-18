<script lang="ts">
    import { Dialog, Portal } from "@skeletonlabs/skeleton-svelte";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { faClose, faLink, faSearch } from "@fortawesome/free-solid-svg-icons";
    import { toaster } from "$lib/toaster";
    import Fa from "svelte-fa";
    import type { Artefact } from "$lib/schemas/artefact";

    const animation =
        "transition transition-discrete opacity-0 translate-y-[100px] starting:data-[state=open]:opacity-0 starting:data-[state=open]:translate-y-[100px] data-[state=open]:opacity-100 data-[state=open]:translate-y-0";

    let {
        versionId,
        onLink,
        linkedObjects
    }: { versionId: string; onLink: () => void; linkedObjects: Artefact[] } = $props();

    let digitalObjects = $state<Artefact[] | null>(null);
    let loading = $state(false);
    let searchQuery = $state("");
    let linkingId = $state<string | null>(null);

    let filteredObjects = $derived(
        (digitalObjects ?? []).filter((obj) =>
            obj.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    async function fetchArtefacts() {
        loading = true;
        try {
            const res = await fetch(`${API_URL}/api/v1/artefacts`);
            if (!res.ok) {
                toaster.error({ title: "Načtení digitálních objektů se nezdařilo" });
                return;
            }

            return (await res.json()) as Artefact[];
        } catch {
            toaster.error({ title: "Načtení digitálních objektů se nezdařilo" });
        } finally {
            loading = false;
        }
    }

    async function linkArtefact(id: string) {
        linkingId = id;
        try {
            const res = await fetch(`${API_URL}/api/v1/artefacts/${id}/link`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ versionId })
            });
            if (!res.ok) {
                toaster.error({ title: "Propojení se nezdařilo" });
                return;
            }
            toaster.success({ title: "Artefakt byl propojen" });
            onLink();
        } catch {
            toaster.error({ title: "Propojení se nezdařilo" });
        } finally {
            linkingId = null;
        }
    }
</script>

<Dialog
    onOpenChange={(open) =>
        open.open && fetchArtefacts().then((objs) => (digitalObjects = objs ?? []))}
>
    <Dialog.Trigger class="btn preset-filled">Propojit existující artefakt</Dialog.Trigger>
    <Portal>
        <Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
        <Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <Dialog.Content
                class="w-full max-w-xl space-y-4 card bg-surface-100-900 p-4 shadow-xl {animation}"
            >
                <header class="flex items-center justify-between">
                    <Dialog.Title class="text-lg font-bold">Propojit artefakt</Dialog.Title>
                    <Dialog.CloseTrigger class="btn-icon hover:preset-tonal">
                        <Fa icon={faClose} />
                    </Dialog.CloseTrigger>
                </header>
                <Dialog.Description>
                    <div class="space-y-4">
                        <div class="input-group grid-cols-[auto_1fr]">
                            <div class="ig-cell preset-tonal">
                                <Fa icon={faSearch} class="size-4" />
                            </div>
                            <input
                                id="search"
                                class="ig-input"
                                type="text"
                                placeholder="Hledat podle popisu..."
                                bind:value={searchQuery}
                            />
                        </div>

                        {#if loading}
                            <p class="opacity-60">Načítání...</p>
                        {:else if filteredObjects.length === 0}
                            <p class="opacity-60">Žádné digitální objekty nenalezeny.</p>
                        {:else}
                            <ul class="space-y-1">
                                {#each filteredObjects as obj (obj.id)}
                                    <li
                                        class="flex items-center justify-between rounded px-2 py-2 hover:bg-surface-100-900"
                                    >
                                        <div class="min-w-0 flex-1">
                                            <div class="font-medium">{obj.label}</div>
                                            {#if obj.internalNote}
                                                <div class="truncate text-sm opacity-60">
                                                    {obj.internalNote}
                                                </div>
                                            {/if}
                                        </div>
                                        {#if linkedObjects.some((linked) => linked.id === obj.id)}
                                            <span class="text-sm font-semibold text-green-400"
                                                >Propojeno</span
                                            >
                                        {:else}
                                            <button
                                                class="btn-ghost ml-2 btn btn-sm"
                                                disabled={linkingId === obj.id}
                                                onclick={() => linkArtefact(obj.id)}
                                            >
                                                {#if linkingId === obj.id}
                                                    <Fa icon={faClose} class="animate-spin" />
                                                {:else}
                                                    <Fa icon={faLink} />
                                                {/if}
                                                Propojit
                                            </button>
                                        {/if}
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    </div>
                </Dialog.Description>
                <footer class="flex justify-end gap-2">
                    <Dialog.CloseTrigger class="btn preset-tonal">Zavřít</Dialog.CloseTrigger>
                </footer>
            </Dialog.Content>
        </Dialog.Positioner>
    </Portal>
</Dialog>
