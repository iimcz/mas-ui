<script lang="ts">
    import Datatable from "$lib/components/Datatable.svelte";
    import type { Work } from "$lib/schemas/work";
    import { goto } from '$app/navigation';
    import { page } from "$app/state";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];

    const headers: any = {
        "": "objekty",
        "work": "díla"
    }

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Popis", key: "description", canSort: true }
    ]

    let filter = $derived(page.url.searchParams.get('filter') ?? "")
    let header = $derived(headers[filter])

    function navigate(id: string) {
        if (filter == "") goto("")
        else if (filter == "work") goto(`/work/${id}`)
    }

    let { data } = $props();
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Existující {header}</h1>
        <Datatable data={data.works} columns={tableColumns} onrowclick={(row: Work) => { navigate(row.id)}} />
    </div>
</div>
