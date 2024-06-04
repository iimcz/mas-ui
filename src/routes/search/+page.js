import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<{works: import('$lib/schemas/work').Work[]}>}
*/
export async function load({ fetch }) {
	return {
        works: [{
            alternativeTitle: "",
            classificationLocation: [],
            classificationTime: [],
            description: "",
            genre: [],
            id: "someId",
            subheading: "",
            title: "Ukázkové dílo",
            yearOfPublication: ""
        }]
    }

	const res = await fetch(`${API_URL}/api/v1/works/`);
	const item = await res.json();

	return item;
}
