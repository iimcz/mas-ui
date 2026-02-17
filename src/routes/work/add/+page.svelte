<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import WorkForm from "../[work]/workForm.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    import { _ } from 'svelte-i18n'
    //import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    import Datatable from "$lib/components/client/Datatable.svelte";
    //const toastStore = getToastStore();
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
            const work = await result.json();
            goto(`${work.id}`);
        }
    }

    /**
     * @param {CustomEvent<import("$lib/schemas/work").Work>} data
     */
    async function createNew(data) {
        const result = await fetch(`${API_URL}/api/v1/works`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        if (result.ok) {
            // TODO: FIX
            //toastStore.trigger({message: $_("save_success"), background: 'variant-filled-success'});

            /**
             * @type {import("$lib/schemas/work").Work}
             */
            const createdWork = await result.json()
            goto(`/work/${createdWork.id}`)
        }
        else {
            const error = await result.text();
            // TODO: FIX
            //toastStore.trigger({message: $_("save_fail") + error, background: 'variant-filled-error'});
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

<HeaderContainer title="Díla dostupná v CollectiveAccess">
    <Datatable data={data.importableWorks} columns={columns}></Datatable>
    <!-- <WorkForm on:save={createNew} isNew={true}></WorkForm> -->
</HeaderContainer>
