<script lang="ts">
    import { currentRoute, currentSidebar, routeOverrides } from "./links";
    import { page } from '$app/state';
    import { stringFormat } from "$lib/stringFormat";

    let links = $derived.by(() => {
        let templatedLinks: {[Key: string]: string} = {};
        for (const link of $currentSidebar) {
            templatedLinks[link.href] = stringFormat(link.href, { ...$routeOverrides, ...page.params })
        }

        return templatedLinks;
    });
</script>

<aside class:visible-submenu={$currentSidebar.length > 0} class="h-full bg-surface-50-900-token border-r border-surface-500/30 overflow-hidden">
    {#if $currentSidebar.length > 0}
        <section class="h-full p-4 pb-20 space-y-4 overflow-y-auto">
            <nav>
                <ul class="flex flex-col gap-2">
                    {#each $currentSidebar as link}
                        <li>
                            {#if link.href == ""}
                                <p class="font-bold ml-2 text-surface-600-400 mt-4">{link.name}</p>
                            {:else}
                                <a class="btn hover:preset-tonal" data-sveltekit-preload-data="tap" class:active-link={link.match == $currentRoute} href={links[link.href]}>
                                    <span class="flex-auto">{link.name}</span>
                                </a>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </nav>
        </section>
    {/if}
</aside>

<style>
    @reference "#layout.css";

    .visible-submenu {
        @apply w-[260px];
    }

    .active-link {
        @apply preset-tonal;
    }
</style>
