import { PUBLIC_API_URL as API_URL } from "$env/static/public";

export interface PlayableObject {
    id: string;
    label: string;
    note: string;
    emulatorSlug: string;
    creationDate: string;
    versionId: string;
    digitalObjectIds: string[];
}

export interface PlayableObjectUpdate {
    label: string;
    note: string;
}

export async function getPlayableObjects(
    fetch: typeof globalThis.fetch,
    versionId: string
): Promise<PlayableObject[]> {
    const response = await fetch(`${API_URL}/api/v1/versions/${versionId}/playableobjects`);
    if (!response.ok) {
        throw new Error(`Failed to fetch playable objects: ${response.statusText}`);
    }

    return response.json();
}

export async function getPlayableObject(
    fetch: typeof globalThis.fetch,
    playableObjectId: string
): Promise<PlayableObject> {
    const response = await fetch(`${API_URL}/api/v1/packages/${playableObjectId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch playable object: ${response.statusText}`);
    }

    return response.json();
}
