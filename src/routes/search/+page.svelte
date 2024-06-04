<script>
    import Datatable from "$lib/components/client/Datatable.svelte";
    import { page } from '$app/stores'
    import { onDestroy } from "svelte";
    import { goto } from '$app/navigation';

    /**
     * @type {Object.<string, string>}
     */
    const headers = {
        "": "objekty",
        "work": "díla",
        "person": "osoby",
    }

    const tableColumns = [
        { name: "Název", key: "title", canSort: true },
        { name: "Zobrazit", key: "name", canSort: false, onClick: (/** @type {import("$lib/schemas/work").Work} */ row) => { navigate(row.id) } }
    ]

    let header = ""
    let filter = ""

    const unsubscribe = page.subscribe((page) => {
        filter = page.url.searchParams.get('filter') ?? ""
        header = headers[filter]
    })

    /**
     * @param {string} id
     */
    function navigate(id) {
        if (filter == "") goto("")
        else if (filter == "work") goto(`/work/${id}`)
        else if (filter == "person") goto(`/person/${id}`)
    }

    onDestroy(() => {
        unsubscribe()
    })

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Existující {header}</h1>
        <Datatable data={data.works} columns={tableColumns} />
    </div>
</div>
