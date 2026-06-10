import type { PageLoad } from "./$types";
import { PUBLIC_API_URL as API_URL } from "$env/static/public";

export const load: PageLoad = async ({ fetch }) => {
    const res = await fetch(`${API_URL}/api/v1/processes`);
    const processList = (await res.json()) as ProcessList;

    return processList;
};
