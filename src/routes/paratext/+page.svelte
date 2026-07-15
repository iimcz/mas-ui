<script lang="ts">
    import Datatable from "$lib/components/Datatable.svelte";
    import { goto } from "$app/navigation";
    import { currentSidebar } from "$lib/components/sidebar/links";
    import type { RemoteParatext } from "$lib/schemas/paratext";
    $currentSidebar = [];

    const tableColumns = [
        { name: "Název", key: "label", canSort: true },
        { name: "Idno", key: "idno", canSort: true },
        { name: "Kurátorský popis", key: "note", canSort: true }
    ];

    let { data } = $props();
</script>

<div class="container mx-auto flex h-full justify-center">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Paratexty v CA</h1>
        <Datatable
            data={data.paratexts}
            columns={tableColumns}
            onrowclick={(row: RemoteParatext) => {
                goto(`/paratext/${row.id}`);
            }}
        />
    </div>
</div>
