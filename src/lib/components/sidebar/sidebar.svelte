<script>
    import Fa from "svelte-fa";
    import { faGamepad, faMagnifyingGlass, faPerson, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

    import { page } from '$app/stores';
    import { workLinks, versionLinks } from "./links";
    import { onDestroy } from "svelte";

    /**
     * @type {import("./links").SidebarLink}
     */
    let currentSidebar = []
    let showSidebar = false;

    const unsubscribe = page.subscribe((page) => {
        let path = page.url.pathname;

        if (path.includes("/version/")) currentSidebar = versionLinks
        else if (path.includes("/work/")) currentSidebar = workLinks
        else currentSidebar = []

        showSidebar = currentSidebar.length > 0
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>

<div class:visible-submenu={showSidebar} class="grid grid-cols-[auto_1fr] h-full bg-surface-50-900-token border-r border-surface-500/30 overflow-hidden">
    <AppRail width="w-24">
        <AppRailAnchor href="/">
            <svelte:fragment slot="lead">
                <Fa icon={faMagnifyingGlass} class="mx-auto"/>
            </svelte:fragment>
            <span>Vyhledat</span>
        </AppRailAnchor>
        <AppRailAnchor href="/search?filter=work">
            <svelte:fragment slot="lead">
                <Fa icon={faGamepad} class="mx-auto"/>
            </svelte:fragment>
            <span>Díla</span>
        </AppRailAnchor>
        <AppRailAnchor href="/search?filter=person">
            <svelte:fragment slot="lead">
                <Fa icon={faPerson} class="mx-auto"/>
            </svelte:fragment>
            <span>Osoby</span>
        </AppRailAnchor>
        <hr/>
        <AppRailAnchor href="/work/add">
            <svelte:fragment slot="lead">
                <Fa icon={faPlus} class="mx-auto"/>
            </svelte:fragment>
            <span>Nové dílo</span>
        </AppRailAnchor>
        <AppRailAnchor href="/person/add">
            <svelte:fragment slot="lead">
                <Fa icon={faPlus} class="mx-auto"/>
            </svelte:fragment>
            <span>Nová osoba</span>
        </AppRailAnchor>
    </AppRail>

    {#if showSidebar}
        <section class="p-4 pb-20 space-y-4 overflow-y-auto">
            <nav class="list-nav">
                <ul>
                    {#each currentSidebar as link}
                        <li>
                            {#if link.href == ""}
                                <p class="font-bold pl-4 my-4 text-2xl">{link.name}</p>
                            {:else}
                                <a class:active-link={$page.url.pathname.match(link.match)} href={link.href}>
                                    <span class="flex-auto">{link.name}</span>
                                </a>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </nav>
        </section>
    {/if}
</div>

<style lang="postcss">
    .visible-submenu {
        @apply w-[360px];
    }

    .active-link {
        @apply bg-primary-500 !important;
    }
</style>
