<script lang="ts">
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import DigitalObjectUploadModal from "$lib/components/digitalObject/DigitalObjectUploadModal.svelte";
    import DigitalObjectLinkModal from "$lib/components/digitalObject/DigitalObjectLinkModal.svelte";
    import { page } from "$app/state";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { toaster } from "$lib/toaster";
    import { currentRoute, currentSidebar, versionLinks } from "$lib/components/sidebar/links";
    import type { DigitalObject } from "$lib/schemas/digitalObject";
    import { invalidateAll } from "$app/navigation";
    import { Fa } from "svelte-fa";
    import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
    import DigitalObjectDataView from "$lib/components/digitalObject/DigitalObjectDataView.svelte";
    import { Collapsible } from "@skeletonlabs/skeleton-svelte";

    $currentSidebar = versionLinks;
    $currentRoute = "paratextList";

    let { data }: { data: { paratext: any; digitalObjects: DigitalObject[] } } = $props();

    async function unlinkDigitalObject(id: string) {
        try {
            const res = await fetch(`${API_URL}/api/v1/digitalobjects/${id}/unlink`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paratextId: page.params.paratext! })
            });
            if (!res.ok) {
                toaster.error({ title: "Odpojení se nezdařilo" });
                return;
            }
            toaster.success({ title: "Digitální objekt byl odpojen" });
        } catch {
            toaster.error({ title: "Odpojení se nezdařilo" });
        } finally {
            await invalidateAll();
        }
    }

    async function refreshDigitalObjects() {
        await invalidateAll();
    }
</script>

<HeaderContainer title={data.paratext.label}>
    <ol class="flex items-center gap-4">
        <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li><a class="opacity-60 hover:underline" href="../../../">Dílo</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li><a class="opacity-60 hover:underline" href="../">Verze</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li>Paratext</li>
    </ol>
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextForm data={data.paratext} />

        <div class="m-2 rounded-container border border-surface-500 p-4">
            <h2 class="text-lg font-semibold">Digitální objekty</h2>

            {#if data.digitalObjects.length === 0}
                <p class="opacity-60">Žádné digitální objekty nejsou propojeny.</p>
            {:else}
                <ul class="mt-2 space-y-1">
                    {#each data.digitalObjects as obj (obj.id)}
                        <Collapsible>
                            <li class="w-full rounded px-2 py-1">
                                <div class="flex items-center gap-4">
                                    <Collapsible.Trigger>
                                        <div class="flex items-center gap-2">
                                            <Collapsible.Indicator class="group">
                                                <Fa
                                                    icon={faPlus}
                                                    class="block size-4 group-data-[state=open]:hidden"
                                                />
                                                <Fa
                                                    icon={faMinus}
                                                    class="hidden size-4 group-data-[state=open]:block"
                                                />
                                            </Collapsible.Indicator>
                                            <span class="text-lg font-medium underline"
                                                >{obj.label}</span
                                            >
                                        </div>
                                    </Collapsible.Trigger>
                                    <button
                                        class="btn preset-outlined-error-500"
                                        onclick={() => unlinkDigitalObject(obj.id)}
                                    >
                                        Odpárovat
                                        <Fa icon={faTrash} class="text-red-400" />
                                    </button>
                                </div>
                                <Collapsible.Content>
                                    <DigitalObjectDataView data={obj} />
                                </Collapsible.Content>
                            </li>
                        </Collapsible>
                    {/each}
                </ul>
            {/if}

            <div class="mt-4 flex gap-2">
                <DigitalObjectUploadModal onSuccess={refreshDigitalObjects} />
                <DigitalObjectLinkModal
                    linkedObjects={data.digitalObjects}
                    paratextId={page.params.paratext!}
                    onLink={refreshDigitalObjects}
                />
            </div>
        </div>
    </div>
</HeaderContainer>
