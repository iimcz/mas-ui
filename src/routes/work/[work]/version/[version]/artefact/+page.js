import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{artefacts: import('$lib/schemas/artefact').Artefact[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    const item = await res.json();

    return { artefacts: item };
}
