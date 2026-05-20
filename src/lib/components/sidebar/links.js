import { writable } from "svelte/store";

/**
 * @typedef {{name: string, href: string, match: string}} SidebarLink
 * @type {SidebarLink[]}
 */
export const workLinks = [
    { name: "Navigace", href: "", match: "" },
    { name: "❮ Zpět na výběr díla", href: "/", match: "" },
    { name: "Dílo", href: "", match: "" },
    { name: "Metadata díla", href: "/work/[work]", match: "workDetail" },
    { name: "Seznam verzí", href: "/work/[work]/version/", match: "versionList" }
];

/**
 * @type {SidebarLink[]}
 */
export const versionLinks = [
    { name: "Navigace", href: "", match: "" },
    { name: "❮ Zpět na dílo", href: "/work/[work]", match: "" },
    { name: "Verze", href: "", match: "" },
    { name: "Metadata verze", href: "/work/[work]/version/[version]", match: "versionDetail" },
    { name: "Digitální objekty", href: "", match: "" },
    {
        name: "Digitální objekty",
        href: "/work/[work]/version/[version]/artefact",
        match: "artefactList"
    },
    {
        name: "Vytvořit digitální objekt",
        href: "/work/[work]/version/[version]/artefact/add",
        match: "addArtefact"
    },
    { name: "Paratexty", href: "", match: "" },
    { name: "Paratexty", href: "/work/[work]/version/[version]/paratext", match: "paratextList" },
    { name: "Herní balíčky", href: "", match: "" },
    {
        name: "Herní balíčky",
        href: "/work/[work]/version/[version]/gameobject",
        match: "gameObjectList"
    },
    {
        name: "Vytvořit herní balíček",
        href: "/work/[work]/version/[version]/gameobject/add/method",
        match: "addGameObject"
    }
];

/**
 * @type {SidebarLink[]}
 */
export const gameObjectLinks = [
    { name: "Verze", href: "", match: "" },
    { name: "❮ Zpět na verzi", href: "/work/[work]/version/[version]", match: "" },
    { name: "Herní balíček", href: "", match: "" },
    {
        name: "Metadata",
        href: "/work/[work]/version/[version]/gameobject/[gameObject]",
        match: "gameObjectDetail"
    },
    { name: "Spustit emulaci", href: "", match: "" },
    {
        name: "Nejnovější prostředí",
        href: "/work/[work]/version/[version]/gameobject/[gameObject]/emulator",
        match: "emulator"
    },
    {
        name: "Originální prostředí",
        href: "/work/[work]/version/[version]/gameobject/[gameObject]/emulator",
        match: "emulator"
    },
        {
        name: "Jiná verze prostředí",
        href: "/work/[work]/version/[version]/gameobject/[gameObject]/environments",
        match: "environmentList"
    },
    { name: "Paratexty", href: "", match: "" },
    {
        name: "Záznamy",
        href: "/work/[work]/version/[version]/gameobject/[gameObject]/paratext",
        match: "paratextList"
    }
];

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
