<script>
    import WorkForm from "./workForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    import { _ } from 'svelte-i18n'
    // TODO: FIX const toastStore = getToastStore();
    $currentSidebar = workLinks;
    $currentRoute = "workDetail";


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();

    /**
     * @param {CustomEvent<import("$lib/schemas/work").Work>} formData
     */
    async function update(formData) {
        const result = await fetch(`${API_URL}/api/v1/works/${data.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });

        /*
        TODO: FIX
        if (result.ok) toastStore.trigger({message: $_("save_success"), background: 'variant-filled-success'});
        else {
            const error = await result.text();
            toastStore.trigger({message: $_("save_fail") + error, background: 'variant-filled-error'});
        }
        */
    }
</script>

<HeaderContainer title="Metadata díla">
    <div class="grid grid-cols-[1fr] gap-2">
        <div class="alert variant-outline">
            <div class="alert-message">
                <h3>← Další kroky</h3>
                <p>
                    Po vytvoření díla je nutné vytvořit verzi.<br/>
                    Další možnosti se nachází v levém menu.
                </p>
                <div>
                    <a href="{data.id}/version/add/" class="btn variant-filled">Přidat verzi</a>
                </div>
            </div>
        </div>
        <WorkForm on:save={update} data={data}/>
    </div>
</HeaderContainer>
