import { PUBLIC_API_URL as API_URL } from "$env/static/public";

export interface ExplorationEnvironment {
    id: string;
    version: string;
    name: string;
    note: string;
}

export async function getExplorationEnvironments(
    fetch: typeof globalThis.fetch
): Promise<ExplorationEnvironment[]> {
    const response = await fetch(`${API_URL}/api/v1/preparation/environments`);
    if (!response.ok) {
        throw new Error(`Failed to fetch exploration environments: ${response.statusText}`);
    }

    return response.json();
}
