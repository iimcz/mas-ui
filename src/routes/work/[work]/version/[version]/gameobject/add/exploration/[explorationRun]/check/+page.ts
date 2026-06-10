import { ExplorationProcess } from "$lib/schemas/exploration/exploration";

export async function load({ fetch, params }) {
    const process = await ExplorationProcess.fromId(fetch, params.explorationRun);

    return { process };
}
