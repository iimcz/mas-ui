import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{tools: import('$lib/schemas/emulator').Emulator[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/emulators`);
    const item = await res.json();

    return { tools: item };
}
