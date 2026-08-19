<script lang="ts">
    import { goto, invalidateAll } from "$app/navigation";
    import { page } from "$app/state";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Datatable from "$lib/components/Datatable.svelte";
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import type { Artefact } from "$lib/schemas/artefact";
    import ArtefactLinkModal from "$lib/components/artefact/ArtefactLinkModal.svelte";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    $currentSidebar = versionLinks;
    $currentRoute = "artefactList";

    async function unlinkArtefact(artefact: Artefact) {
        await fetch(`${API_URL}/api/v1/artefacts/${artefact.id}/unlink`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ versionId: page.params.version })
        });
        refreshArtefacts();
    }

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Název souboru", key: "fileName", canSort: true },
        { name: "Typ", key: "type", canSort: true },
        { name: "Formát", key: "format", canSort: true },
        { name: "Velikost", key: "fileSize", canSort: true },
        { name: "Interní poznámka", key: "internalNote", canSort: true },
        { name: "Odpojit", key: "unlink", canSort: false, onClick: unlinkArtefact }
    ];

    let { data } = $props();

    async function refreshArtefacts() {
        await invalidateAll();
    }
</script>

<HeaderContainer title="Artefakty">
    <div class="flex justify-end gap-2">
        <ArtefactLinkModal
            linkedObjects={data.artefacts}
            versionId={page.params.version!}
            onLink={refreshArtefacts}
        />
        <a href="artefact/add" class="btn preset-filled">
            <Fa icon={faPlus} />
            Vytvořit nový
        </a>
    </div>
    <Datatable
        data={data.artefacts}
        columns={tableColumns}
        onrowclick={(row: Artefact) => goto(`artefact/${row.id}`)}
    />
</HeaderContainer>
