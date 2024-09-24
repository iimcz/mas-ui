import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/emulationState').EmulationState>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/packages/${params.gameObject}/emulate`);
    const item = await res.json();

    return item;
}
