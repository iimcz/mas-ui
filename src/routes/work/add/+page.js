import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{importableWorks: import('$lib/schemas/importableWork').ImportableWork[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/import/available`);
    const item = await res.json();

    return { importableWorks: item };
}
