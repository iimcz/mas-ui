<script lang="ts">
    import { currentSidebar } from "$lib/components/sidebar/links";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { goto } from "$app/navigation";
    import { _ } from "svelte-i18n";
    import Datatable from "$lib/components/Datatable.svelte";
    import { toaster } from "$lib/toaster";
    import type { ImportableWork } from "$lib/schemas/importableWork";
    import type { Work } from "$lib/schemas/work";
    import type { PageData } from "./$types";

    $currentSidebar = [];

    async function importWork(work: ImportableWork) {
        const result = await fetch(`${API_URL}/api/v1/import`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(work)
        });

        if (result.ok) {
            toaster.success({ title: $_("save_success") });
            const work = (await result.json()) as Work;
            goto(`${work.id}`);
        } else {
            const error = await result.text();
            toaster.error({ title: $_("save_fail"), description: error });
        }
    }

    const columns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Počet verzí", key: "numVersions", canSort: true },
        { name: "Kurátorský popis", key: "curatorialDescription", canSort: true },
        { name: "Již importováno", key: "isAlreadyImported", canSort: true },
        { name: "Importovat dílo a verze", key: "import", canSort: false, onClick: importWork }
    ];

    export let data: PageData;
</script>

<div class="container mx-auto flex h-full justify-center">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Díla dostupná v CollectiveAccess</h1>
        <Datatable data={data.importableWorks} {columns}></Datatable>
    </div>
</div>
