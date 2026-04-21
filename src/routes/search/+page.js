import { PUBLIC_API_URL as API_URL } from "$env/static/public";

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{works: import('$lib/schemas/work').Work[]}>}
 */
export async function load({ fetch }) {
    const res = await fetch(`${API_URL}/api/v1/works/`);
    const items = await res.json();

    return { works: items };
}
