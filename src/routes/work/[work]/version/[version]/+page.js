import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/version').Version>}
*/
export async function load({ fetch, params }) {
    return {
        id: "someVersion",
        alternativeTitle: "",
        note: "",
        status: [],
        system: [],
        systemRequirements: "",
        title: "Ukázková verze",
        workId: "someWork",
        yearOfPublication: ""
    }

    const res = await fetch(`${API_URL}/api/v1/works/${params.work}/version/${params.version}`);
    const item = await res.json();

    return item;
}
