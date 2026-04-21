<script lang="ts">
    import Datatable from "$lib/components/Datatable.svelte";
    import type { Work } from "$lib/schemas/work";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];

    const headers: any = {
        "": "objekty",
        work: "díla"
    };

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Popis", key: "description", canSort: true }
    ];

    let filter = $derived(page.url.searchParams.get("filter") ?? "");
    let header = $derived(headers[filter]);

    function navigate(id: string) {
        if (filter == "") goto("");
        else if (filter == "work") goto(`/work/${id}`);
    }

    let { data } = $props();
</script>

<div class="container mx-auto flex h-full justify-center">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Existující {header}</h1>
        <Datatable
            data={data.works}
            columns={tableColumns}
            onrowclick={(row: Work) => {
                navigate(row.id);
            }}
        />
    </div>
</div>
