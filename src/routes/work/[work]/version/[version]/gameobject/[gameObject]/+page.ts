import { getPlayableObject } from "$lib/schemas/playableObject";

export async function load({ fetch, params }) {
    const playableObject = await getPlayableObject(fetch, params.gameObject);

    return { playableObject };
}
