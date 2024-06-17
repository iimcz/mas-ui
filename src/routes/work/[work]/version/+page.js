import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{versions: import('$lib/schemas/version').Version[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/works/${params.work}/versions`);
    const item = await res.json();

    return { versions: item };
}
