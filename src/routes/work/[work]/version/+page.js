import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{versions: import('$lib/schemas/version').Version[]}>}
*/
export async function load({ fetch, params }) {
    return {versions: [{
        id: "someVersion",
        alternativeTitle: "",
        note: "",
        status: [],
        system: [],
        systemRequirements: "",
        title: "Ukázková verze",
        workId: "someWork",
        yearOfPublication: ""
    }]}

    const res = await fetch(`${API_URL}/api/v1/works/${params.work}/versions`);
    const item = await res.json();

    return item;
}
