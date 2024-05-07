<script>
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";

    export let isNew = false;
    let tabSet = 0;
</script>

<TabGroup>
    <Tab bind:group={tabSet} name="tab1" value={0}>
        <span>Strukturovaný popis</span>
    </Tab>
    <Tab bind:group={tabSet} name="tab2" value={1}>Volný text (AI)</Tab>
    <!-- Tab Panels --->
    <svelte:fragment slot="panel">
        {#if tabSet === 0}
            <form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
                <label class="label">
                    <span>Název</span>
                    <input class="input" type="text" />
                </label>
                <label class="label">
                    <span>Placeholder...</span>
                    <input class="input" type="text" />
                </label>
                <a href="/person/[id]" type="button" class="btn variant-filled">{ isNew ? "Vytvořit" : "Upravit" }</a>
            </form>
        {:else if tabSet === 1}
            <div class="flex flex-col gap-y-2">
                <textarea class="textarea resize-none" rows="8" placeholder="Vložený text pro automatickou detekci pomocí AI..." />
                <button type="button" class="btn variant-filled">Odeslat</button>
            </div>
        {/if}
    </svelte:fragment>
</TabGroup>
