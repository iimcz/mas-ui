import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/conversionProcess').ConversionProcess>}
*/
export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/conversion/${params.process}/status`);
    const process = await res.json();

    return process;
}
