import { PUBLIC_API_URL as API_URL } from "$env/static/public";

export async function load({ fetch, params }) {
    const paraRes = await fetch(`${API_URL}/api/v1/versions/${params.version}/paratexts`);
    const paratexts = await paraRes.json();

    return { paratexts };
}
