import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { PlayableObject } from "../playableObject";
import type { Process, ProcessDetail, ProcessStatus } from "../process";

interface ExplorationRequest {
    environmentId: string;
    digitalObjectIds: string[];
}

export enum ExplorationStateEnum {
    InitialConversion = "InitialConversion",
    InitialUpload = "InitialUpload",
    ExplorationEnvironmentRunning = "ExplorationEnvironmentRunning",
    DownloadExplorationData = "DownloadExplorationData",
    ExtractingPlayableInfo = "ExtractingPlayableInfo",
    WaitingForCheck = "WaitingForCheck",
    UploadKioskData = "UploadKioskData",
    KioskEnvironmentRunning = "KioskEnvironmentRunning",
    Aborted = "Aborted",
    Done = "Done"
}

export interface ExplorationDetail extends ProcessDetail {
    streamUrl: string;
    state: ExplorationStateEnum;
    latestParsedPlayable: PlayableObject | null;
}

interface ExplorationInput {
    typeName: string;
}

export enum ExplorationTypeEnum {
    Ping = "Ping",
    GotoExploration = "GotoExploration",
    GotoCheck = "GotoCheck",
    GotoKiosk = "GotoKiosk",
    Save = "Save",
    Finish = "Finish",
    Abort = "Abort"
}

class Ping implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.Ping;
}

class GotoExploration implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.GotoExploration;
}

class GotoCheck implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.GotoCheck;
}

class GotoKiosk implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.GotoKiosk;
}

class Save implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.Save;
}

class Finish implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.Finish;
    packageName: string;
    packageNote: string;

    constructor(packageName: string, packageNote: string) {
        this.packageName = packageName;
        this.packageNote = packageNote;
    }
}

class Abort implements ExplorationInput {
    typeName: string = ExplorationTypeEnum.Abort;
}

export class ExplorationProcess implements Process<ExplorationDetail> {
    id: string;
    status: ProcessStatus;
    statusDetail: ExplorationDetail;
    startTime: string;

    public constructor(
        id: string,
        status: ProcessStatus,
        statusDetail: ExplorationDetail,
        startTime: string
    ) {
        this.id = id;
        this.status = status;
        this.statusDetail = statusDetail;
        this.startTime = startTime;
    }

    async input<T extends ExplorationInput>(
        fetch: typeof globalThis.fetch,
        input: T
    ): Promise<ExplorationProcess> {
        const result = await fetch(
            `${API_URL}/api/v1/preparation/${this.id}/input/${input.typeName}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            }
        );

        return result.ok
            ? ExplorationProcess.fromJson(await result.json())
            : Promise.reject(new Error(`Failed to send input: ${result.statusText}`));
    }

    async ping(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new Ping());
    }

    async gotoExploration(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new GotoExploration());
    }

    async gotoCheck(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new GotoCheck());
    }

    async gotoKiosk(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new GotoKiosk());
    }

    async save(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new Save());
    }

    async waitForState(
        fetch: typeof globalThis.fetch,
        desiredState: ExplorationStateEnum
    ): Promise<ExplorationProcess> {
        let state: ExplorationProcess = this;

        while (state.statusDetail.state !== desiredState) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            state = await state.ping(fetch);
        }

        return state;
    }

    async finish(
        fetch: typeof globalThis.fetch,
        packageName: string,
        packageNote: string
    ): Promise<ExplorationProcess> {
        return this.input(fetch, new Finish(packageName, packageNote));
    }

    async abort(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new Abort());
    }

    static async fromId(fetch: typeof globalThis.fetch, id: string): Promise<ExplorationProcess> {
        const result = await fetch(`${API_URL}/api/v1/preparation/${id}/input/ping`, {
            method: "POST"
        });

        return result.ok
            ? ExplorationProcess.fromJson(await result.json())
            : Promise.reject(new Error(`Failed to send initial ping: ${result.statusText}`));
    }

    static fromJson(init: ExplorationProcess) {
        return new ExplorationProcess(
            init?.id,
            init?.status,
            init?.statusDetail,
            init?.startTime
        );
    }

    static async start(
        fetch: typeof globalThis.fetch,
        request: ExplorationRequest
    ): Promise<ExplorationProcess> {
        const result = await fetch(`${API_URL}/api/v1/preparation/start`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        });

        return result.ok
            ? result.json()
            : Promise.reject(new Error(`Failed to start exploration: ${result.statusText}`));
    }
}
