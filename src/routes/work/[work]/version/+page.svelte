<script>
    import { goto } from "$app/navigation";
    import Datatable from "$lib/components/client/Datatable.svelte";

    const tableColumns = [
        { name: "Název verze", key: "title", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import('$lib/schemas/version').Version} */ row) => goto(`/work/${row.workId}/version/${row.id}`)},
    ]

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    $currentSidebar = workLinks;
    $currentRoute = "versionList";

    /** @type {import('./$types').PageData} */
	export let data;
</script>


<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Verze</h1>
        <Datatable data={data.versions} columns={tableColumns}/>
    </div>
</div>
