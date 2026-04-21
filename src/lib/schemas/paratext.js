import { PUBLIC_API_URL as API_URL } from "$env/static/public";
import { _ } from "svelte-i18n";
import { get } from "svelte/store";

/**
 * @typedef {{
 *  id: string,
 *  language: string,
 *  date: string,
 *  internalNote: string,
 *  filledOutBy: string,
 *  websiteUrl: string,
 *  emissionSize: number,
 *  identificationNumber: string,
 *  paratextType: string,
 *  importedAt: string,
 *  exportedAt: string
 * }} Paratext
 */
export const unused = {};

/** @param paratext {Paratext} */
export function getParatextThumbnail(paratext) {
    // TODO: use maybe digital object for the thumbnail or forward there on the backend
    //if (paratext.thumbnail.startsWith("url:")) return paratext.thumbnail.substring(4)
    //else
    return get(_)(`paratext.${paratext.thumbnail.substring(9)}`);
}

/** @param paratext {Paratext} */
export function downloadParatext(paratext) {
    // TODO: same as above - data is in digitalobject now
    console.log("TODO: Implement downloading paratexts/digital objects");
    //if (paratext.downloadable) window.location.assign(`${API_URL}/api/v1/paratexts/${paratext.id}/download`)
    //else window.location.assign(paratext.sourceUrl)
}

/**
 * @param id {string} Paratext ID
 * @param file {File}
 * */
export async function uploadFile(id, file) {
    // TODO: same as above, decide if backend should hide digital objects or frontend should work with them (probably the latter)
    /*
    const fileName = file?.name;
    const data = new FormData();
    data.append("file", file)

    await fetch(`${API_URL}/api/v1/paratexts/${id}/upload/${fileName}`, {
        method: "POST",
        body: data
    });
    */
}
