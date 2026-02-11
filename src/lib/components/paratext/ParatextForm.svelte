<script>
    import { enhance } from "$app/forms";
    import * as yup from 'yup';
    import { _ } from 'svelte-i18n'
    // TODO: FIX import { getToastStore } from '@skeletonlabs/skeleton-svelte';
    // TODO: FIX const toastStore = getToastStore();
    import ParatextDataEntry from "./ParatextDataEntry.svelte"



    /**
     * @typedef {Object} Props
     * @property {boolean} [isNew]
     * @property {import("$lib/schemas/paratext").Paratext} [data]
     */

    /** @type {Props} */
    let { isNew = false, data = {
        id: "",
        workId: "",
        versionId: null,
        packageId: null,
        name: "",
        description: "",
        source: "",
        sourceUrl: "",
        downloadable: false,
        thumbnail: ""
    } } = $props();
    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        source: yup.string(),
        sourceUrl: yup.string().url(),
    });

    // TODO: Just redo the validation entirely
    // TODO: Use form is broken with enhance, supposedly superform is better
    /*
    const { form, errors, isValid } = createForm({
        extend: validator({ schema }),
    });
    */
</script>

<form method="post" use:enhance={() => { return async ({ update }) => {await update(); toastStore.trigger({message: $_("save_success"), background: 'preset-filled-success'}); } }} enctype="multipart/form-data" class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <ParatextDataEntry canUpload={isNew} data={data} />
    <button type="submit" class="btn float-right preset-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</form>
