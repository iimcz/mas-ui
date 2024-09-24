import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/emulationState').EmulationState>}
*/
export async function load({ fetch, params }) {
    console.log(`${API_URL}/api/v1/packages/${params.gameObject}/emulate`)
    const res = await fetch(`${API_URL}/api/v1/packages/${params.gameObject}/emulate`, {
        method: "POST"
    });
    console.log(res)
    const item = await res.json();

    return item;
}
