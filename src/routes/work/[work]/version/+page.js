import { PUBLIC_API_URL as API_URL } from '$env/static/public';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{versions: import('$lib/schemas/workVersion').WorkVersion[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/works/${params.work}/versions`);
    const item = await res.json();

    return { versions: item };
}
