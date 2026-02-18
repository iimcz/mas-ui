<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import GamePackageForm from "$lib/components/process/GamePackageForm.svelte";

    import { API_URL } from "$lib/config";
    import { _ } from 'svelte-i18n'

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    import { toaster } from "$lib/toaster";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "gameObjectDetail";

    /**
     * @param {CustomEvent<import("$lib/schemas/gamePackage").GamePackage>} formData
     */
     async function update(formData) {
        const result = await fetch(`${API_URL}/api/v1/packages/${formData.detail.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });

        if (result.ok) toaster.success({title: $_("save_success")});
        else {
            const error = await result.text();
            toaster.error({title: $_("save_fail"), description: error});
        }
    }


    /**
     * @typedef {Object} Props
     * @property {import('./$types').PageData} data
     */

    /** @type {Props} */
    let { data } = $props();
</script>

<HeaderContainer title="Metadata herního balíčku">
    <div class="grid grid-cols-[1_fr] gap-2">
        <div class="alert preset-outline">
            <div class="alert-message">
                <h3>← Další kroky</h3>
                <p>
                    Po vytvoření herního balíčku je možné spustit emulaci.<br/>
                    Další možnosti se nachází v levém menu.
                </p>
                <div>
                    <a href="{data.id}/profile/[id]/emulator" class="btn preset-filled">Spustit emulaci</a>
                </div>
            </div>
        </div>
        <GamePackageForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
