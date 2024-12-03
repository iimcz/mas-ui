import { API_URL } from "$lib/config.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();

        /** @type {any} */
        var formDataObject = {};
        formData.forEach((value, key) => formDataObject[key] = value);
        const json = JSON.stringify(formDataObject);

        const paratextRes = await fetch(`${API_URL}/api/v1/works/${params.work}/paratexts`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: json
        });

        /** @type {import("$lib/schemas/paratext.js").Paratext} */
        const paratext = await paratextRes.json();


        // TODO: How does this work with typing
        // @ts-ignore
        const file = formData.get("file");
        // @ts-ignore
        const fileName = file?.name;
        const data = new FormData();
        // @ts-ignore
        data.append("file", file)

        const fileRes = await fetch(`${API_URL}/api/v1/paratexts/${paratext.id}/upload/${fileName}`, {
            method: "POST",
            body: data
        });

        console.log(data)
        console.log(await fileRes.text())

        redirect(303, `/paratext/${paratext.id}`)
    }
}
