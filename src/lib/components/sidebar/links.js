/**
 * @typedef {{name: string, href: string, match: string}[]} SidebarLink
 * @type {SidebarLink}
 */
export const workLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]", match: "/work/.*" },
    { name: "Verze", href: "", match: "" },
    { name: "Verze", href: "/work/[id]/version/", match: "/work/.*/version" },
    { name: "Přidat verzi", href: "/work/[id]/version/add", match: "/work/.*/version/add" },
    { name: "Osoby", href: "", match: "" },
    { name: "Osoby", href: "/work/[id]/person", match: "$/work/.*/person^" },
    { name: "Přidat osobu", href: "/work/[id]/person/add", match: "/work/.*/person/add" },
]

/**
 * @type {SidebarLink}
 */
export const versionLinks = [
    { name: "Dílo", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]", match: "/work/.*" },
    { name: "Verze", href: "", match: "" },
    { name: "Metadata", href: "/work/[id]/version/[id]/gameobjects", match: "/work/.*/version/.*/gameobjects/.*/info" },
    { name: "Profily", href: "/gameobjects/profiles", match: "/work/.*/version/.*/gameobjects/.*/profiles" },
    { name: "Záznamy", href: "/gameobjects/recordings", match: "/work/.*/version/.*/gameobjects/.*/recordings" },
    { name: "Herní objekty", href: "", match: "" },
    { name: "Artefakty", href: "", match: "" },
    { name: "Artefakty", href: "/gameobjects/artefacts", match: "/work/.*/version/.*/artefacts/" },
    { name: "Přidat artefakt", href: "/wizard/platform", match: "/work/.*/version/.*/artefacts/add" },
    { name: "Konfigurace", href: "", match: "" },
    { name: "Konfigurace", href: "/gameobjects/configurations", match: "/work/.*/version/.*/gameobjects/.*/configurations" },
    { name: "Vytvořit konfiguraci", href: "/wizard/platform", match: "/work/.*/version/.*/gameobjects/.*/configurations" },
    { name: "Spustit defaultní konfiguraci", href: "/emulator", match: "/work/.*/version/.*/gameobjects/.*/configurations/.*/emulator" },
]
