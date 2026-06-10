import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { ExplorationDetail, Process, ProcessStatus } from "../process";

interface ExplorationRequest {
    environmentId: string;
    digitalObjectIds: string[];
}

interface ExplorationInput {
    typeName: string;
}

class Ping implements ExplorationInput {
    typeName: string = "Ping";
}

class GotoExploration implements ExplorationInput {
    typeName: string = "GotoExploration";
}

class GotoKiosk implements ExplorationInput {
    typeName: string = "GotoKiosk";
}

class Quit implements ExplorationInput {
    typeName: string = "Quit";
}

export class ExplorationProcess implements Process<ExplorationDetail> {
    id: string;
    status: ProcessStatus;
    statusDetail: ExplorationDetail;
    startTime: string;

    constructor(
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
            ? result.json()
            : Promise.reject(new Error(`Failed to send input: ${result.statusText}`));
    }

    async ping(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new Ping());
    }

    async gotoExploration(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new GotoExploration());
    }

    async gotoKiosk(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new GotoKiosk());
    }

    async quit(fetch: typeof globalThis.fetch): Promise<ExplorationProcess> {
        return this.input(fetch, new Quit());
    }

    static async fromId(fetch: typeof globalThis.fetch, id: string): Promise<ExplorationProcess> {
        const result = await fetch(`${API_URL}/api/v1/preparation/${id}/input/ping`, {
            method: "POST"
        });

        return result.ok
            ? result.json()
            : Promise.reject(new Error(`Failed to send initial ping: ${result.statusText}`));
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
