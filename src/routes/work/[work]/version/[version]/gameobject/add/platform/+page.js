import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{platforms: import('$lib/schemas/platform').Platform[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/platforms`);
    const platforms = await res.json();

    return { platforms };
}
