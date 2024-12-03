import { writable } from 'svelte/store';

/**
 * @typedef {{name: string, href: string, match: string}} SidebarLink
 * @type {SidebarLink[]}
 */
export const workLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "Metadata", href: "/work/[work]", match: "workDetail" },
    { name: "Verze", href: "", match: "" },
    { name: "Verze", href: "/work/[work]/version/", match: "versionList" },
    { name: "Přidat verzi", href: "/work/[work]/version/add", match: "addVersion" },
    { name: "Paratexty", href: "", match: "" },
    { name: "Paratexty", href: "/work/[work]/paratext/", match: "paratextList" },
    { name: "Přidat paratext", href: "/work/[work]/paratext/add", match: "addParatext" },
]

/**
 * @type {SidebarLink[]}
 */
export const versionLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "← Zpět na dílo", href: "/work/[work]", match: "" },
    { name: "Verze", href: "", match: "" },
    { name: "Metadata", href: "/work/[work]/version/[version]", match: "versionDetail" },
    { name: "Artefakty", href: "", match: "" },
    { name: "Artefakty", href: "/work/[work]/version/[version]/artefact", match: "artefactList" },
    { name: "Přidat artefakt", href: "/work/[work]/version/[version]/artefact/add", match: "addArtefact" },
    { name: "Paratexty", href: "", match: "" },
    { name: "Paratexty", href: "/work/[work]/version/[version]/paratext", match: "paratextList" },
    { name: "Přidat paratext", href: "/work/[work]/version/[version]/paratext/add", match: "addParatext" },
    { name: "Herní objekty", href: "", match: "" },
    { name: "Herní objekty", href: "/work/[work]/version/[version]/gameobject", match: "gameObjectList" },
    { name: "Vytvořit herní objekt", href: "/work/[work]/version/[version]/gameobject/add/platform", match: "addGameObject" },
    { name: "Spustit výchozí herní objekt", href: "/work/[work]/version/[version]/gameobject/[id]/emulator", match: "emulator" },
]

/**
 * @type {SidebarLink[]}
 */
export const gameObjectLinks = [
    { name: "Verze", href: "", match: "" },
    { name: "← Zpět na verzi", href: "/work/[work]/version/[version]", match: "" },
    { name: "Herní objekt", href: "", match: "" },
    { name: "Metadata", href: "/work/[work]/version/[version]/gameobject/[gameObject]", match: "gameObjectDetail" },
    { name: "Spustit výchozí profil", href: "/work/[work]/version/[version]/gameobject/[gameObject]/profile/[id]/emulator", match: "emulator" },
    { name: "Profily", href: "", match: "" },
    { name: "Profily", href: "/work/[work]/version/[version]/gameobject/[gameObject]/profile", match: "profileList" },
    { name: "Vytvořit profil", href: "/work/[work]/version/[version]/gameobject/[gameObject]/profile/add", match: "addProfile" },
    { name: "Paratexty", href: "", match: "" },
    { name: "Záznamy", href: "/work/[work]/version/[version]/gameobject/[gameObject]/paratext", match: "paratextList" },
]

/**
 * @type {import('svelte/store').Writable<SidebarLink[]>}
 */
export const currentSidebar = writable([]);


/**
 * @type {import('svelte/store').Writable<string>}
 */
export const currentRoute = writable("");

/**
 * Additional route slugs to be applied outside of the request URL
 * Proper slugs always take precedence
 * @type {import('svelte/store').Writable<Object<string,string>>}
 */
export const routeOverrides = writable({});
