<script lang="ts">
    import type { Work } from "$lib/schemas/work";
    let { data }: { data: Work } = $props()
</script>

<div class="form flex flex-col">
    <div>Název díla</div>
    <div>{data.label}</div>

    <div>Typ díla</div>
    <div>{data.typeOfWork}</div>

    <div>Interní poznámka</div>
    <div>{data.internalNote}</div>

    <div>Importováno</div>
    <div>{data.importedAt == null ? "" : new Date(data.importedAt).toLocaleString()}</div>
</div>

<style scoped>
    @reference "#layout.css";

    .form > *:nth-child(2n + 1) {
        @apply mt-4 text-lg;
    }

    .form > *:nth-child(2n) {
        @apply ml-2;
    }
</style>
