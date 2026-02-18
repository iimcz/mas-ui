<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import { currentSidebar } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    import { _ } from 'svelte-i18n'
    import Datatable from "$lib/components/Datatable.svelte";
    import { toaster } from "$lib/toaster";
    $currentSidebar = [];

    /**
     * @param {import("$lib/schemas/importableWork").ImportableWork} work
     */
    async function importWork(work) {
        const result = await fetch(`${API_URL}/api/v1/import`,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(work)
            });
        if (result.ok) {
            /** @type {import("$lib/schemas/work").Work} */
            toaster.success({title: $_("save_success")});
            const work = await result.json();
            goto(`${work.id}`);
        }
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }

    const columns = [
        {name: "Název", key: "label", canSort: true},
        {name: "Počet verzí", key: "numVersions", canSort: true},
        {name: "Již importováno", key: "isAlreadyImported", canSort: true},
        {name: "Importovat dílo a verze", key: "import", canSort: false, onClick: importWork}
    ];

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Díla dostupná v CollectiveAccess</h1>
        <Datatable data={data.importableWorks} columns={columns}></Datatable>
    </div>
</div>
