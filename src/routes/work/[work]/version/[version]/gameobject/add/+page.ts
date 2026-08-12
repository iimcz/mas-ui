import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import { getExplorationEnvironments } from "$lib/schemas/exploration/explorationEnvironment";
import type { DigitalObject } from "$lib/schemas/digitalObject.js";

export async function load({ fetch, params }) {
    const environments = await getExplorationEnvironments(fetch);

    const digitalObjectsRes = await fetch(
        `${API_URL}/api/v1/versions/${params.version}/digitalobjects`
    );
    const digitalObjects = (await digitalObjectsRes.json()) as DigitalObject[];
    const recommendedSize = digitalObjects.map((doj) => doj.fileSize).reduce((p, c) => p + c, 0);

    return { environments, digitalObjects, recommendedSize };
}
