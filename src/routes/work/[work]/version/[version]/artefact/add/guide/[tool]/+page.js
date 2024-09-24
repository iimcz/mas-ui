import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/digitalizationTool').DigitalizationTool>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/digitalization/tools/${params.tool}`);
    const tool = await res.json();

    return tool;
}
