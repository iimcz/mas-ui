<script>
    import { faRemove } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    /** @type {string[]} */
    export let values = [];

    /** @type {string} */
    export let name = "";

    /** @type {boolean} */
    export let required = false;

    /** @type {string} */
    let newValue = "";

    /** @type {boolean} */
    $: showAddRequired = required && values.length == 0;

    /** @param {number} index*/
    function removeValue(index) {
        values.splice(index, 1);
        values = values;
    }

    function addValue() {
        values = [...values, newValue];
    }

    $: {
        if (newValue != "") {
            addValue();
            newValue = "";
        }
    }
</script>

{#each values as value, index}
    <div class="flex">
        <div class="input-group input-group-divider">
            <!-- svelte-ignore a11y-autofocus -->
            <input name="{name}.{index}.value" type="text" placeholder={required ? "Povinné" : ""} bind:value autofocus />
        </div>
        <button class="btn-icon variant-filled-error ml-2" on:click={() => removeValue(index)}>
            <Fa icon={faRemove} />
        </button>
    </div>
{/each}

<div class="input-group input-group-divider">
    <input type="text" placeholder="{showAddRequired ? "Povinné" : "Přidat další..."}" bind:value={newValue} />
</div>
