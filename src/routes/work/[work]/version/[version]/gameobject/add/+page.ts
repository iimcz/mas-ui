import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { Artefact } from "$lib/schemas/artefact";
import { getExplorationEnvironments } from "$lib/schemas/exploration/explorationEnvironment";

export async function load({ fetch, params }) {
    const environments = await getExplorationEnvironments(fetch);

    const artefactsRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    const digitalObjects = (await artefactsRes.json()) as Artefact[];

    // TODO: Also fetch game packages
    //const digitalObjects = await getDigitalObjects(fetch, params.work, params.version);

    return { environments, digitalObjects };
}
