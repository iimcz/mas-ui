import type { Actions } from "./$types";
import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { Paratext } from "$lib/schemas/paratext";

export const actions = {
    update: async ({ request, params }) => {
        const formData = await request.formData();

        var formDataObject: Record<string, any> = {};
        formData.forEach((value, key) => (formDataObject[key] = value));
        const json = JSON.stringify(formDataObject);

        const paratextRes = await fetch(`${API_URL}/api/v1/remoteparatexts/${params.paratext}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json
        });

        (await paratextRes.json()) as Paratext;
    },
    export: async ({ params }) => {
        const paratextRes = await fetch(`${API_URL}/api/v1/export/paratext/${params.paratext}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        (await paratextRes.json()) as Paratext;
    }
} satisfies Actions;
