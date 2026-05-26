import { PUBLIC_API_URL as API_URL } from "$env/static/public";

/**
 * @type {import('./exploration/$types').PageLoad}
 * @returns {Promise<{environments: any, artefacts: import('$lib/schemas/artefact').Artefact[]}>}
 */
export async function load({ fetch, params }) {
    // TODO: Also grab game packages
    const resArtefact = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    //const resEnvironments = await fetch(`${API_URL}/api/v1/environments`); // TODO: Change when api is finalized

    //const environments = await resEnvironments.json();
    const artefacts = await resArtefact.json();

    return { environments: [], artefacts };
}
