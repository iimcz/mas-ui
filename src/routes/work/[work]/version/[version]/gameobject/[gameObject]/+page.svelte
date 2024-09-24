<script>
    import { API_URL } from "$lib/config";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import GamePackageForm from "$lib/components/process/GamePackageForm.svelte";

    import { currentSidebar, currentRoute, gameObjectLinks } from "$lib/components/sidebar/links";
    $currentSidebar = gameObjectLinks;
    $currentRoute = "gameObjectDetail";

    /**
     * @param {CustomEvent<import("$lib/schemas/gamePackage").GamePackage>} formData
     */
     async function update(formData) {
        await fetch(`${API_URL}/api/v1/packages/${formData.detail.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });
    }

    /** @type {import('./$types').PageData} */
	export let data;
</script>

<HeaderContainer title="Metadata herního balíčku">
    <div class="grid grid-cols-[1_fr] gap-2">
        <GamePackageForm data={data} on:save={update}/>
    </div>
</HeaderContainer>
