<script lang="ts">
    import Blockquote from "$lib/components/Blockquote.svelte";
import type { WorkVersion } from "$lib/schemas/workVersion";
    let { data }: { data: WorkVersion } = $props()
</script>

<div class="card p-4 preset-outlined-surface-300-700 form flex flex-col">
    <div>Název verze</div>
    <Blockquote>{data.label}</Blockquote>

    <div>Podnázev</div>
    <Blockquote>{data.subtitle}</Blockquote>

    <div>Popis</div>
    <Blockquote>{@html data.description}</Blockquote>

    <div>Kurátorský popis</div>
    <Blockquote>{data.curatorialDescription}</Blockquote>

    <div>Ochrana proti kopírování</div>
    <Blockquote>{data.copyProtection}</Blockquote>

    <div>Systém</div>
    <Blockquote>{data.system}</Blockquote>

    <div>Importováno</div>
    <Blockquote>{data.importedAt == null ? "" : new Date(data.importedAt).toLocaleString()}</Blockquote>
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
