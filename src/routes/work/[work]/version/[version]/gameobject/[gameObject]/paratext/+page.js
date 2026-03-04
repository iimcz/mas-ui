import { PUBLIC_API_URL as API_URL } from '$env/static/public';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{paratexts: import('$lib/schemas/paratext').Paratext[]}>}
*/
export async function load({ fetch, params }) {
	const paraRes = await fetch(`${API_URL}/api/v1/packages/${params.gameObject}/paratexts`);
	const paratexts = await paraRes.json();

	return { paratexts };
}
