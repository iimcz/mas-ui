<script>
    import { run } from 'svelte/legacy';

    import { currentRoute, currentSidebar, routeOverrides } from "./links";
    import { page } from '$app/stores';
    import { stringFormat } from "$lib/stringFormat";

    /**
     * Templated URLs
     * @type {Object.<string, string>}
     */
    let links = $state({})

    run(() => {
        for (const link of $currentSidebar) {
            links[link.href] = stringFormat(link.href, { ...$routeOverrides, ...$page.params })
        }
    });
</script>

<div class:visible-submenu={$currentSidebar.length > 0} class="h-full bg-surface-50-900-token border-r border-surface-500/30 overflow-hidden">
    {#if $currentSidebar.length > 0}
        <section class="h-full p-4 pb-20 space-y-4 overflow-y-auto">
            <nav class="list-nav">
                <ul>
                    {#each $currentSidebar as link}
                        <li>
                            {#if link.href == ""}
                                <p class="font-bold pl-4 my-4 text-2xl">{link.name}</p>
                            {:else}
                                <a data-sveltekit-preload-data="tap" class:active-link={link.match == $currentRoute} href={links[link.href]}>
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

<style>
    @reference "#layout.css";

    .visible-submenu {
        @apply w-[260px];
    }

    .active-link {
        @apply bg-primary-500;
    }
</style>
