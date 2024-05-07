<script>
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import PersonForm from "../personForm.svelte";
</script>

<HeaderContainer title="Osoba - Test">
    <div class="card flex p-2 flex-col">
        <span class="text-xl font-bold p-4">Popis</span>
        <PersonForm />
    </div>
</HeaderContainer>
