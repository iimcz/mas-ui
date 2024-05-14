import { writable } from 'svelte/store';

/**
 * @typedef {{name: string, href: string, match: string}} SidebarLink
 * @type {SidebarLink[]}
 */
export const workLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]", match: "workDetail" },
    { name: "Verze", href: "", match: "" },
    { name: "Verze", href: "/work/[id]/version/", match: "versionList" },
    { name: "Přidat verzi", href: "/work/[id]/version/add", match: "addVersion" },
    { name: "Osoby", href: "", match: "" },
    { name: "Osoby", href: "/work/[id]/person", match: "personList" },
    { name: "Přidat osobu", href: "/work/[id]/person/add", match: "addPerson" },
]

/**
 * @type {SidebarLink[]}
 */
export const versionLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "← Zpět na dílo", href: "/work/[id]", match: "" },
    { name: "Verze", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]/version/[id]", match: "versionDetail" },
    { name: "Záznamy", href: "/work/[id]/version/[id]/recording", match: "recordingList" },
    { name: "Artefakty", href: "", match: "" },
    { name: "Artefakty", href: "/work/[id]/version/[id]/artefact", match: "artefactList" },
    { name: "Přidat artefakt", href: "/work/[id]/version/[id]/artefact/add/media", match: "addArtefact" },
    { name: "Herní objekty", href: "", match: "" },
    { name: "Herní objekty", href: "/work/[id]/version/[id]/gameobject", match: "gameObjectList" },
    { name: "Vytvořit herní objekt", href: "/work/[id]/version/[id]/gameobject/add/platform", match: "addGameObject" },
    { name: "Spustit výchozí herní objekt", href: "/work/[id]/version/[id]/gameobject/[id]/emulator", match: "emulator" },
]

/**
 * @type {SidebarLink[]}
 */
export const gameObjectLinks = [
    { name: "Verze", href: "", match: "" },
    { name: "← Zpět na verzi", href: "/work/[id]/version/[id]", match: "" },
    { name: "Herní objekt", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]/version/[id]/gameobject/[id]", match: "gameObjectDetail" },
    { name: "Spustit výchozí profil", href: "/work/[id]/version/[id]/gameobject/[id]/profile/[id]/emulator", match: "emulator" },
    { name: "Profily", href: "", match: "" },
    { name: "Profily", href: "/work/[id]/version/[id]/gameobject/[id]/profile", match: "profileList" },
    { name: "Vytvořit profil", href: "/work/[id]/version/[id]/gameobject/[id]/profile/add", match: "addProfile" },
]

/**
 * @type {import('svelte/store').Writable<SidebarLink[]>}
 */
export const currentSidebar = writable([]);


/**
 * @type {import('svelte/store').Writable<string>}
 */
export const currentRoute = writable("");
