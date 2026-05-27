<script lang="ts">
    import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
    import { Fa } from "svelte-fa";

    let { theme = $bindable() }: { theme: string } = $props();
</script>

<button class="btn py-2 hover:preset-tonal" onclick={() => theme = theme === 'dark' ? 'light' : 'dark'}>
    <Fa icon={theme === 'dark' ? faMoon : faSun} />
    {theme === 'dark' ? 'Dark' : 'Light'} Mode
</button>
