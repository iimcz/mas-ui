<script>
    import { enhance } from "$app/forms";
    import { createForm } from "felte";
    import { validator } from "@felte/validator-yup";
    import * as yup from 'yup';

    import ParatextDataEntry from "./ParatextDataEntry.svelte"

    export let isNew = false;

    /** @type {import("$lib/schemas/paratext").Paratext} */
    export let data = {
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
    }
    const schema = yup.object({
        name: yup.string().required(),
        description: yup.string().required(),
        source: yup.string(),
        sourceUrl: yup.string().url(),
    });

    const { form, errors, isValid } = createForm({
        extend: validator({ schema }),
    });
</script>

<form method="post" use:form use:enhance enctype="multipart/form-data" class="card flex p-2 flex-col">
    <span class="text-xl font-bold p-4">Popis</span>
    <ParatextDataEntry canUpload={isNew} data={data} />
    <button type="submit" class="btn float-right variant-filled">{isNew ? "Vytvořit" : "Uložit změny"}</button>
</form>
