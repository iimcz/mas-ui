import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{ gameObjects: import('$lib/schemas/gamePackage').GamePackage[] }>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/versions/${params.version}/packages`);
    const item = await res.json();

    return { gameObjects: item };
}
