<script lang="ts">
    import type { WorkVersion } from "$lib/schemas/workVersion";
    let { data }: { data: WorkVersion } = $props()
</script>

<div class="form flex flex-col">
    <div>Název verze</div>
    <div>{data.label}</div>

    <div>Podnázev</div>
    <div>{data.subtitle}</div>

    <div>Popis</div>
    <div>{data.description}</div>

    <div>Kurátorský popis</div>
    <div>{data.curatorialDescription}</div>

    <div>Ochrana proti kopírování</div>
    <div>{data.copyProtection}</div>

    <div>Systém</div>
    <div>{data.system}</div>

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
