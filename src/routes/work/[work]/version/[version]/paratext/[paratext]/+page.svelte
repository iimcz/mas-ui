<script>
    import ParatextForm from "$lib/components/paratext/ParatextForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";

    import { currentRoute, currentSidebar, versionLinks } from "$lib/components/sidebar/links";
    $currentSidebar = versionLinks;
    $currentRoute = "paratextList";

    let { data } = $props();
</script>

<HeaderContainer title={data.paratext.label}>
    <ol class="flex items-center gap-4">
        <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li><a class="opacity-60 hover:underline" href="../../../">Dílo</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li><a class="opacity-60 hover:underline" href="../">Verze</a></li>
        <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
        <li>Paratext</li>
    </ol>
    <div class="grid grid-cols-[1fr] gap-2">
        <ParatextForm data={data.paratext} />
    </div>
</HeaderContainer>
