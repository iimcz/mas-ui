import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{paratexts: import('$lib/schemas/paratext').Paratext[], versions: import('$lib/schemas/workVersion').WorkVersion[]}>}
*/
export async function load({ fetch, params }) {
	const paraRes = await fetch(`${API_URL}/api/v1/works/${params.work}/paratexts`);
	const versionRes = await fetch(`${API_URL}/api/v1/works/${params.work}/versions`);

	const paratexts = await paraRes.json();
	const versions = await versionRes.json();

	return { paratexts, versions };
}
