import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import type { Paratext } from "$lib/schemas/paratext";

export async function load({ fetch, params }) {

    return {
        paratext: {
            id: "123",
            label: "Test Paratext",
            language: "en",
            date: "2024-01-01",
            internalNote: "This is a test paratext.",
            filledOutBy: "John Doe",
            websiteUrl: "https://example.com",
            emissionSize: 100,
            identificationNumber: "ID12345",
            paratextType: "Test Type",
            importedAt: "2024-01-01T00:00:00Z",
            exportedAt: "2024-01-02T00:00:00Z",
            canExport: true
        } as Paratext
    }

    const res = await fetch(`${API_URL}/api/v1/paratexts/${params.paratext}`);
    const paratext = (await res.json()) as Paratext;

    return { paratext };
}
