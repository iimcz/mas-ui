import { ExplorationProcess } from "$lib/schemas/exploration/exploration";
import { ProcessStatus } from "$lib/schemas/process";

export async function load({ fetch, params }) {
    // TODO: Swap out when it works
    //const process = await ExplorationProcess.fromId(fetch, params.explorationRun);

    return {
        process: new ExplorationProcess(
            params.explorationRun,
            ProcessStatus.Initialization,
            {},
            "time"
        )
    };
}
