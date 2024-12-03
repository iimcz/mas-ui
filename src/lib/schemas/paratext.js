import { API_URL } from '$lib/config';
import { _ } from 'svelte-i18n'
import { get } from 'svelte/store';

/**
* @typedef {{
*  id: string
*  workId: string
*  versionId: string | null
*  packageId: string | null
*  name: string
*  description: string
*  source: string
*  sourceUrl: string
*  downloadable: boolean
*  thumbnail: string
* }} Paratext
*/
export const unused = {};

/** @param paratext {Paratext} */
export function getParatextThumbnail(paratext) {
    if (paratext.thumbnail.startsWith("url:")) return paratext.thumbnail.substring(4)
    else return get(_)(`paratext.${paratext.thumbnail.substring(9)}`)
}

/** @param paratext {Paratext} */
export function downloadParatext(paratext) {
    if (paratext.downloadable) window.location.assign(`${API_URL}/api/v1/paratexts/${paratext.id}/download`)
    else window.location.assign(paratext.sourceUrl)
}

/**
 * @param id {string} Paratext ID
 * @param file {File}
 * */
export async function uploadFile(id, file) {
    const fileName = file?.name;
    const data = new FormData();
    data.append("file", file)

    await fetch(`${API_URL}/api/v1/paratexts/${id}/upload/${fileName}`, {
        method: "POST",
        body: data
    });
}
