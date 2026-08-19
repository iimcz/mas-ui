import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { RemoteParatext } from "$lib/schemas/paratext";

export async function load({ fetch }) {
    const res = await fetch(`${API_URL}/api/v1/remoteparatexts`);
    const items = (await res.json()) as RemoteParatext[];

    return { paratexts: items };
}
