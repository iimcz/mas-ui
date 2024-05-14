<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import WorkForm from "../[work]/workForm.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];
</script>

<HeaderContainer title="Nové dílo">
    <WorkForm isNew={true}></WorkForm>
</HeaderContainer>
