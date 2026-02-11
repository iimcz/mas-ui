<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import VersionForm from "../[version]/versionForm.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    import { goto } from "$app/navigation";
    import { page } from "$app/state";
    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    import { _ } from 'svelte-i18n'
    // TODO: FIX const toastStore = getToastStore();
    $currentSidebar = workLinks;
    $currentRoute = "addVersion";

    /**
     * @param {CustomEvent<import("$lib/schemas/version").Version>} data
     */
     async function createNew(data) {
        data.detail.workId = page.params.work

        const result = await fetch(`${API_URL}/api/v1/versions`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data.detail)
        });

        if (result.ok) {
            // TODO: FIX
            //toastStore.trigger({message: $_("save_success"), background: 'preset-filled-success'});

            /**
             * @type {import("$lib/schemas/version").Version}
             */
            const createdVersion = await result.json()
            goto(`/work/${createdVersion.workId}/version/${createdVersion.id}`)
        }
        else {
            const error = await result.text();
            // TODO: FIX
            //toastStore.trigger({message: $_("save_fail") + error, background: 'preset-filled-error'});
        }


    }
</script>

<HeaderContainer title="Nová verze">
    <VersionForm on:save={createNew} isNew={true}></VersionForm>
</HeaderContainer>
