<script>
    import WorkForm from "./workForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import { API_URL } from "$lib/config";
    $currentSidebar = workLinks;
    $currentRoute = "workDetail";

    /** @type {import('./$types').PageData} */
	export let data;

    /**
     * @param {CustomEvent<import("$lib/schemas/work").Work>} formData
     */
    async function update(formData) {
        await fetch(`${API_URL}/api/v1/works/${data.id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData.detail)
        });
    }
</script>

<HeaderContainer title="Metadata díla">
    <div class="grid grid-cols-[1fr] gap-2">
        <WorkForm on:save={update} data={data}/>
    </div>
</HeaderContainer>
