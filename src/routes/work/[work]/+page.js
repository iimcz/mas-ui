import { API_URL } from '$lib/config';

/**
 * @type {import('./$types').PageLoad}
 * @returns {Promise<import('$lib/schemas/work').Work>}
*/
export async function load({ fetch, params }) {
	return {
		alternativeTitle: "",
		classificationLocation: [],
		classificationTime: [],
		description: "",
		genre: [],
		id: "",
		subheading: "",
		title: "",
		yearOfPublication: "",
	}

	const res = await fetch(`${API_URL}/api/v1/works/${params.work}`);
	const item = await res.json();

	return item;
}
