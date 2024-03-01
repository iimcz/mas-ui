<script>
    import Fa from "svelte-fa";
    import { faGamepad, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";

    import { page } from '$app/stores';
    import { gameObjectLinks } from "./links";

    /**
     * @type {gameObjectLinks}
     */
    let currentSidebar = []
    let showSidebar = false;

    page.subscribe((page) => {
        let basePath = page.url.pathname.split('/')[1] ?? "";
        currentSidebar = ['gameobjects', 'wizard'].includes(basePath) ? gameObjectLinks : []
        showSidebar = currentSidebar.length > 0
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
        <AppRailAnchor href="/search">
            <svelte:fragment slot="lead">
                <Fa icon={faGamepad} class="mx-auto"/>
            </svelte:fragment>
            <span>Herní objekty</span>
        </AppRailAnchor>
        <hr/>
        <AppRailAnchor href="/gameobjects/info">
            <svelte:fragment slot="lead">
                <Fa icon={faPlus} class="mx-auto"/>
            </svelte:fragment>
            <span>Nový objekt</span>
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
                                <a class:active-link={$page.url.pathname.includes(link.href)} href={link.href}>
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
