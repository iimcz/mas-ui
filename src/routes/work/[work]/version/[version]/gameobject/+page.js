import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{ gameObjects: import('$lib/schemas/gamePackage').GamePackage[] }>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/versions/${params.version}/packages`);
    console.log(res)

    const item = await res.json();

    console.log(item)

    return { gameObjects: item };
}
