import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { PlayableObject } from "$lib/schemas/playableObject";

export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/versions/${params.version}/playableobjects`);
    const playableObjects = (await res.json()) as PlayableObject[];

    return { playableObjects };
}
