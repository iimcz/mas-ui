<script lang="ts">
    import { currentRoute, currentSidebar, routeOverrides } from "./links";
    import { page } from "$app/state";
    import { stringFormat } from "$lib/stringFormat";

    let links = $derived.by(() => {
        let templatedLinks: { [Key: string]: string } = {};
        for (const link of $currentSidebar) {
            templatedLinks[link.href] = stringFormat(link.href, {
                ...$routeOverrides,
                ...page.params
            });
        }

        return templatedLinks;
    });
</script>

<aside
    class:hidden={$currentSidebar.length == 0}
    class="bg-surface-50-900-token h-full overflow-hidden border-r border-surface-500/30"
>
    {#if $currentSidebar.length > 0}
        <section class="h-full space-y-4 overflow-y-auto p-4 pb-20">
            <nav>
                <ul class="flex flex-col gap-2">
                    {#each $currentSidebar as link}
                        <li>
                            {#if link.href == ""}
                                <p class="mt-4 ml-2 font-bold text-surface-600-400">{link.name}</p>
                            {:else}
                                <a
                                    class="btn hover:preset-tonal"
                                    data-sveltekit-preload-data="tap"
                                    class:active-link={link.match == $currentRoute}
                                    href={links[link.href]}
                                >
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

<style scoped>
    @reference "#layout.css";

    .active-link {
        @apply preset-tonal;
    }
</style>
