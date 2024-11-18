import { API_URL } from "$lib/config.js";
import { redirect } from "@sveltejs/kit";

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();

        await fetch(`${API_URL}/api/v1/works/${params.work}/paratexts`, {
            method: "PUT",
            headers: { "Content-Type": request.headers.get("Content-Type") ?? "" },
            body: formData
        });

        redirect(303, `.`)
    }
}
