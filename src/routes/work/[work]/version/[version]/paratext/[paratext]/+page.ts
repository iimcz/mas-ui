import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { Paratext } from "$lib/schemas/paratext";
import type { DigitalObject } from "$lib/schemas/digitalObject";

export async function load({ fetch, params }) {
    const res = await fetch(`${API_URL}/api/v1/paratexts/${params.paratext}`);
    const paratext = (await res.json()) as Paratext;

    const digitalObjectRes = await fetch(
        `${API_URL}/api/v1/paratexts/${params.paratext}/digitalobjects`
    );
    const digitalObjects = (await digitalObjectRes.json()) as DigitalObject[];

    return { paratext, digitalObjects };
}
