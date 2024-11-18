import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/paratext').Paratext>}
*/
export async function load({ fetch, params }) {
	const res = await fetch(`${API_URL}/api/v1/paratexts/${params.paratext}`);
	const item = await res.json();

	return item;
}
