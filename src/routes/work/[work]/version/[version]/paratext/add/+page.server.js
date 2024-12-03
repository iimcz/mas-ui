import { API_URL } from "$lib/config.js";
import { formDataToJSON } from "$lib/formData";
import { uploadFile } from "$lib/schemas/paratext.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();

        const paratextRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/paratexts`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: formDataToJSON(formData)
        });

        /** @type {import("$lib/schemas/paratext.js").Paratext} */
        const paratext = await paratextRes.json();

        // @ts-ignore FormDataEntry -> File
        await uploadFile(paratext.id, formData.get("file"));

        redirect(303, `/paratext/${paratext.id}`)
    }
}
