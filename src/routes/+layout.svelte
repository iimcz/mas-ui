<script lang="ts">
    import "./layout.css";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import { _ } from "svelte-i18n";

    import { AppBar, Toast } from "@skeletonlabs/skeleton-svelte";
    import Sidebar from "$lib/components/sidebar/sidebar.svelte";
    import LocaleSwitcher from "$lib/components/LocaleSwitcher.svelte";

    import Fa from "svelte-fa";
    import { faSave, faDatabase } from "@fortawesome/free-solid-svg-icons";
    import { currentSidebar } from "$lib/components/sidebar/links";
    import { toaster } from "$lib/toaster";
    import ThemeSwitcher from "$lib/components/ThemeSwitcher.svelte";

    let { children } = $props();
    let theme = $state("");

    $effect(() => {
        if (theme == "") theme = localStorage.getItem("mode") || "light";
        document.documentElement.setAttribute("data-mode", theme);
        localStorage.setItem("mode", theme);
    });
</script>

<Toast.Group {toaster}>
    {#snippet children(toast)}
        <Toast {toast}>
            <Toast.Message>
                <Toast.Title>{toast.title}</Toast.Title>
                <Toast.Description>{toast.description}</Toast.Description>
            </Toast.Message>
            <Toast.CloseTrigger />
        </Toast>
    {/snippet}
</Toast.Group>

<div class="grid h-full grid-rows-[auto_1fr]">
    <AppBar class="h-[70px] border-b border-surface-200-800 bg-surface-50-950/75 backdrop-blur-lg">
        <AppBar.Toolbar class="container mx-auto grid-cols-[1fr_auto]">
            <AppBar.Headline>
                <a href="/" class="mr-4 flex items-center text-xl font-bold uppercase">
                    <Fa class="mr-2" icon={faSave} />
                    {$_("page_title")}
                </a>
            </AppBar.Headline>
            <AppBar.Trail>
                <a
                    href="{API_URL}/api/v1/router/ca/home"
                    target="_blank"
                    class="text-l mr-4 flex items-center font-bold uppercase"
                >
                    <Fa class="mr-2" icon={faDatabase} />
                    Collective Access
                </a>
                <ThemeSwitcher bind:theme />
                <LocaleSwitcher />
            </AppBar.Trail>
        </AppBar.Toolbar>
    </AppBar>
    <div class="mx-auto grid w-full max-w-[80vw] grid-cols-[240px_1fr]">
        <Sidebar />
        <main class:col-span-2={$currentSidebar.length == 0} class="ml-2">
            {@render children?.()}
        </main>
    </div>
</div>
