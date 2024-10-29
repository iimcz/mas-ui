import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{paratexts: import('$lib/schemas/paratext').Paratext[], gamePackages: import('$lib/schemas/gamePackage').GamePackage[]}>}
*/
export async function load({ fetch, params }) {
	const paraRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/paratexts`);
	const packageRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/packages`);

	const paratexts = await paraRes.json();
	const gamePackages = await packageRes.json();

	return { paratexts, gamePackages };
}
