<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import WorkForm from "../[work]/workForm.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    import { _ } from 'svelte-i18n'
    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    // TODO: FIX const toastStore = getToastStore();    $currentSidebar = [];

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
</script>

<HeaderContainer title="Nové dílo">
    <WorkForm on:save={createNew} isNew={true}></WorkForm>
</HeaderContainer>
