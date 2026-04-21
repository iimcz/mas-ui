import { PUBLIC_API_URL as API_URL } from "$env/static/public";

export const actions = {
    default: async ({ request, params }) => {
        const formData = await request.formData();

        /** @type {any} */
        var formDataObject = {};
        formData.forEach((value, key) => (formDataObject[key] = value));
        const json = JSON.stringify(formDataObject);

        const paratextRes = await fetch(`${API_URL}/api/v1/paratexts/${params.paratext}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json
        });

        await paratextRes.json();
    }
};
