<script>
    import { createForm } from "felte";
    import { validator } from "@felte/validator-yup";
    import * as yup from 'yup';

    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        source: yup.string(),
        sourceUrl: yup.string().url(),
    });

    const { form, errors, isValid } = createForm({
        extend: validator({ schema }),
    });

    /** @type {import("$lib/schemas/paratext").Paratext} */
    export let data;
</script>

<form use:form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název</p>
        <div class="input-group input-group-divider">
        <input type="text" bind:value={data.name} />
    </div>
    <p>Popis</p>
        <div class="input-group input-group-divider">
        <input type="text" bind:value={data.description} />
    </div>
    <p>Popis Zdroj</p>
        <div class="input-group input-group-divider">
        <input type="text" bind:value={data.source} />
    </div>
    <p>URL Zdroje</p>
        <div class="input-group input-group-divider">
        <input type="text" bind:value={data.sourceUrl} />
    </div>
</form>
