import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{tools: import('$lib/schemas/digitalizationTool').DigitalizationTool[]}>}
*/
export async function load({ fetch, params }) {
    return { tools: [
        {
            id: "cd1",
            isAvailable: true,
            name: "cd-ripper",
            physicalMediaType: "CD",
            version: "1.0"
        },
        {
            id: "cd2",
            isAvailable: false,
            name: "cd-extractor",
            physicalMediaType: "CD",
            version: "2.0"
        },
    ] }

    const res = await fetch(`${API_URL}/api/v1/digitalization/tools`);
    const item = await res.json();

    return { tools: item };
}
