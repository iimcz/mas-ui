<script>
    import { run } from 'svelte/legacy';

    import { faRemove } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    /**
     * @typedef {Object} Props
     * @property {string[]} [values]
     * @property {string} [name]
     * @property {boolean} [required]
     */

    /** @type {Props} */
    let { values = $bindable([]), name = "", required = false } = $props();

    /** @type {string} */
    let newValue = $state("");

    /** @type {boolean} */
    let showAddRequired = $derived(required && values.length == 0);

    /** @param {number} index*/
    function removeValue(index) {
        values.splice(index, 1);
        values = values;
    }

    function addValue() {
        values = [...values, newValue];
    }

    run(() => {
        if (newValue != "") {
            addValue();
            newValue = "";
        }
    });
</script>

{#each values as value, index}
    <div class="flex">
        <div class="input-group input-group-divider">
            <!-- svelte-ignore a11y_autofocus -->
            <input name="{name}.{index}.value" type="text" placeholder={required ? "Povinné" : ""} bind:value={values[index]} autofocus />
        </div>
        <button class="btn-icon preset-filled-error ml-2" onclick={() => removeValue(index)}>
            <Fa icon={faRemove} />
        </button>
    </div>
{/each}

<div class="input-group input-group-divider">
    <input type="text" placeholder="{showAddRequired ? "Povinné" : "Přidat další..."}" bind:value={newValue} />
</div>
