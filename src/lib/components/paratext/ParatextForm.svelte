<script lang="ts">
    import { enhance } from "$app/forms";
    import { _ } from "svelte-i18n";
    import { toaster } from "$lib/toaster";
    import ParatextDataEntry from "./ParatextDataEntry.svelte";

    import type { Paratext } from "$lib/schemas/paratext";
    import ParatextDataView from "./ParatextDataView.svelte";

    function exportParatext(): void {}

    let { data }: { data: Partial<Paratext> } = $props();
</script>

<form
    method="post"
    use:enhance={() => {
        return async ({ update }) => {
            await update();
            toaster.success({
                title: $_("save_success")
            });
        };
    }}
    enctype="multipart/form-data"
    class="flex flex-col card p-2"
>
    {#if data.canExport}
        <ParatextDataEntry {data} />

        <button formaction="?/update" type="submit" class="float-right btn preset-filled"
            >Uložit změny</button
        >

        <button
            formaction="?/export"
            type="button"
            onclick={exportParatext}
            class="float-right btn preset-filled">Exportovat do CA</button
        >
    {:else}
        <ParatextDataView {data} />
    {/if}
</form>
