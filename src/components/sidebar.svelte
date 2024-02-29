<script>

    import Fa from "svelte-fa";
    import { faGamepad, faInfo, faMagnifyingGlass, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
</script>
<AppRail width="w-24">
    <AppRailAnchor href="/">
        <svelte:fragment slot="lead">
            <Fa icon={faMagnifyingGlass} class="mx-auto"/>
        </svelte:fragment>
        <span>Vyhledat</span>
    </AppRailAnchor>
    <AppRailAnchor href="/search">
        <svelte:fragment slot="lead">
            <Fa icon={faGamepad} class="mx-auto"/>
        </svelte:fragment>
        <span>Herní objekty</span>
    </AppRailAnchor>
    <hr/>
    <AppRailAnchor href="/artefacts/add">
        <svelte:fragment slot="lead">
            <Fa icon={faSave} class="mx-auto"/>
        </svelte:fragment>
        <span>Nový objekt a artefakt</span>
    </AppRailAnchor>
    <AppRailAnchor href="/gameobjects/info">
        <svelte:fragment slot="lead">
            <Fa icon={faInfo} class="mx-auto"/>
        </svelte:fragment>
        <span>Nový objekt bez artefaktu</span>
    </AppRailAnchor>
</AppRail>
