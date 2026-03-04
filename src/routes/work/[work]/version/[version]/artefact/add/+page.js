import { PUBLIC_API_URL as API_URL } from '$env/static/public';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{tools: import('$lib/schemas/digitalizationTool').DigitalizationTool[]}>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/digitalization/tools`);
    const item = await res.json();

    return { tools: item };
}
