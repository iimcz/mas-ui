<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import PersonForm from "../personForm.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];
</script>

<HeaderContainer title="Přidat osobu">
    <div class="card flex p-2 flex-col">
        <span class="text-xl font-bold p-4">Popis</span>
        <PersonForm isNew={true} />
    </div>
</HeaderContainer>
