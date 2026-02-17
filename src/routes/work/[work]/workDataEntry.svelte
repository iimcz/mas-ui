<script>
    import * as yup from 'yup';

    const schema = yup.object({
        title: yup.string().required(),
        genre: yup.array().of(yup.object({
            value: yup.string().required()
        })).min(1).required(),
    });

    // TODO: FIX
    /*
    const { form, errors, isValid } = createForm({
        extend: validator({ schema }),
    });
    */

    /** @type {import("$lib/schemas/work").Work} */
    export let data;
</script>

<form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
    <p>Název díla</p>
    <div class="input-group input-group-divider">
        <input type="text" name="label" readonly bind:value={data.label} />
    </div>
    <p>Typ díla</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.typeOfWork} />
    </div>
    <p>Interní poznámka</p>
    <div class="input-group input-group-divider">
        <input type="text" readonly bind:value={data.internalNote} />
    </div>
    <p>Importováno</p>
    <div class="input-group input-group-divider">
        <input type="datetime" readonly bind:value={data.importedAt} />
    </div>
</form>
