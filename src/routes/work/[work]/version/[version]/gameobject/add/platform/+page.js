import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{platforms: import('$lib/schemas/platform').Platform[], artefacts: import('$lib/schemas/artefact').Artefact[]}>}
*/
export async function load({ fetch, params }) {
    const resPlat = await fetch(`${API_URL}/api/v1/platforms`);
    const platforms = await resPlat.json();

    const resArt = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    const artefacts = await resArt.json();

    return { platforms, artefacts };
}
