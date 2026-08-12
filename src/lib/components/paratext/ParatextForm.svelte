<script lang="ts">
    import { enhance } from "$app/forms";
    import { _ } from "svelte-i18n";
    import { toaster } from "$lib/toaster";

    import type { Paratext } from "$lib/schemas/paratext";
    import ParatextDataView from "./ParatextDataView.svelte";
    import ParatextDataEntry from "./ParatextDataEntry.svelte";

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
        <div class="flex flex-col justify-end gap-2">
            <ParatextDataEntry {data} />

            <button formaction="?/update" type="submit" class="float-right btn preset-filled"
                >Uložit změny</button
            >

            <button formaction="?/export" type="button" class="float-right btn preset-filled"
                >Exportovat do CA</button
            >
        </div>
    {:else}
        <ParatextDataView {data} />
    {/if}
</form>
