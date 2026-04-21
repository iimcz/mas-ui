<script lang="ts">
    import Blockquote from "$lib/components/Blockquote.svelte";
    import type { Work } from "$lib/schemas/work";
    let { data }: { data: Work } = $props();
</script>

<div class="form flex flex-col card preset-outlined-surface-300-700 p-4">
    <div>Název díla</div>
    <Blockquote>{data.label}</Blockquote>

    <div>Typ díla</div>
    <Blockquote>{data.typeOfWork}</Blockquote>

    <div>Interní poznámka</div>
    <Blockquote>{data.internalNote}</Blockquote>

    <div>Importováno</div>
    <Blockquote
        >{data.importedAt == null ? "" : new Date(data.importedAt).toLocaleString()}</Blockquote
    >
</div>

<style scoped>
    @reference "#layout.css";

    .form > *:nth-child(2n + 1) {
        @apply mt-4 text-lg;
    }

    .form > *:nth-child(1) {
        @apply mt-0;
    }
</style>
