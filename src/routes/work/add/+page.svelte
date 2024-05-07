<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import WorkForm from "../[work]/workForm.svelte";

</script>

<HeaderContainer title="Nové dílo">
    <WorkForm isNew={true}></WorkForm>
</HeaderContainer>
