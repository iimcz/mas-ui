import { API_URL } from "$lib/config.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();
        const res = await fetch(`${API_URL}/api/v1/paratexts/${params.paratext}`, {
            method: "POST",
            headers: { "Content-Type": request.headers.get("Content-Type") ?? "" },
            body: formData
        });
        console.log(await res.text())

        redirect(303, `/`)
    }
}
