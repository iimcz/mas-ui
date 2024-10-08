import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{ state: import('$lib/schemas/emulationState').EmulationState, streamSource: string}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/packages/${params.gameObject}/emulate`, { method: "POST" });
    const state = await res.json();

    const resStream = await fetch(`${API_URL}/api/v1/emulation/${state.id}/video`);
    const streamSource = await resStream.text();

    return { state, streamSource };
}
