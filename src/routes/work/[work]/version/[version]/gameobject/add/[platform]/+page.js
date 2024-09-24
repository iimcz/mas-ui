import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{emulators: import('$lib/schemas/emulator').Emulator[], artefacts: import('$lib/schemas/artefact').Artefact[]}>}
*/
export async function load({ fetch, params }) {
    const resArtefact = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    const resEmulator = await fetch(`${API_URL}/api/v1/platforms/${params.platform}/emulators`);

    const emulators = await resEmulator.json();
    const artefacts = await resArtefact.json();

    return { emulators, artefacts };
}
