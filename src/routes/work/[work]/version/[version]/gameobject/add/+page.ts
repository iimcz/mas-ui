import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { Artefact } from "$lib/schemas/artefact";
import { getPlayableObjects } from "$lib/schemas/playableObject";
import { getExplorationEnvironments } from "$lib/schemas/exploration/explorationEnvironment";

export async function load({ fetch, params }) {
    const environments = await getExplorationEnvironments(fetch);

    const artefactsRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/artefacts`);
    const artefacts = (await artefactsRes.json()) as Artefact[];
    const artefactsIds = artefacts.map((doj) => ({ id: doj.id, label: doj.label }));

    const playableObjects = await getPlayableObjects(fetch, params.version);
    const playableObjectsIds = playableObjects
        .map((po) => po.digitalObjectIds.map((id) => ({ id, label: po.label })))
        .flat();

    return { environments, artefactsIds, playableObjectsIds };
}
