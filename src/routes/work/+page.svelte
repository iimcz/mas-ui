<script lang="ts">
    import Datatable from "$lib/components/Datatable.svelte";
    import type { Work } from "$lib/schemas/work";
    import { goto } from "$app/navigation";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Počet verzí", key: "numVersions", canSort: true },
        { name: "Kurátorský popis", key: "description", canSort: true }
    ];

    let { data } = $props();
</script>

<div class="container mx-auto flex h-full justify-center">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Existující díla</h1>
        <Datatable
            data={data.works}
            columns={tableColumns}
            onrowclick={(row: Work) => {
                goto(`/work/${row.id}`);
            }}
        />
    </div>
</div>
