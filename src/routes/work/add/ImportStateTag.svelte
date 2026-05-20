<script lang="ts">
    let props = $props();
</script>

<div class="flex justify-center">
    {#if props.isAlreadyImported === true}
        <span class="badge preset-filled-success-500">Ano</span>
    {:else}
        <span class="badge preset-filled-error-500">Ne</span>
    {/if}
</div>
