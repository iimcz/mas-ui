<script>
    import StringListInput from "$lib/components/StringListInput.svelte";
    import * as yup from 'yup';

    const schema = yup.object({
        title: yup.string().required(),
        genre: yup.array().of(yup.object({
            value: yup.string().required()
        })).min(1).required(),
    });

    // TODO: Just redo the validation entirely
    /*
    const { form, errors, isValid } = createForm({
        extend: validator({ schema }),
    });
    */


    /**
     * @typedef {Object} Props
     * @property {import("$lib/schemas/work").Work} data
     */

    /** @type {Props} */
    let { data = $bindable() } = $props();
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název díla</p>
    <div class="input-group input-group-divider">
        <input type="text" name="title" placeholder="Povinné" bind:value={data.title} />
    </div>
    <p>Alternativní název</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.alternativeTitle} />
    </div>
    <p>Dílčí název</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.subheading} />
    </div>
    <p>Popis</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.description} />
    </div>
    <p>Rok vydání</p>
    <div class="input-group input-group-divider">
        <input type="text" bind:value={data.yearOfPublication} />
    </div>
    <p>Žánry</p>
    <StringListInput required={true} name="genre" bind:values={data.genre} />
    <p>Klasifikace - Doba</p>
    <StringListInput bind:values={data.classificationTime} />
    <p>Klasifikace - Lokace</p>
    <StringListInput bind:values={data.classificationLocation} />
    <p>Poznámka</p>
    <div class="input-group input-group-divider">
        <input type="text" />
    </div>
</form>
