/**
 * @typedef {{name: string, href: string}[]} SidebarLink
 */
export const workLinks = [
    { name: "Dílo", href: "" },
    { name: "Metadata", href: "/work/[id]/info" },
    { name: "Verze", href: "" },
    { name: "Verze", href: "/work/[id]/version/" },
    { name: "Přidat verzi", href: "/work/[id]/version/add" },
    { name: "Osoby", href: "" },
    { name: "Osoby", href: "/work/[id]/person" },
    { name: "Přidat osobu", href: "/work/[id]/person/add" },
]

export const versionLinks = [
    { name: "Dílo", href: "" },
    { name: "Metadata", href: "/work/[id]/info" },
    { name: "Herní objekty", href: "" },
    { name: "Metadata", href: "/gameobjects/info" },
    { name: "Profily", href: "/gameobjects/profiles" },
    { name: "Záznamy", href: "/gameobjects/recordings" },
    { name: "Artefakty", href: "" },
    { name: "Artefakty", href: "/gameobjects/artefacts" },
    { name: "Přidat artefakt", href: "/artefacts/add" },
    { name: "Konfigurace", href: "" },
    { name: "Konfigurace", href: "/gameobjects/configurations" },
    { name: "Vytvořit konfiguraci", href: "/wizard/platform" },
    { name: "Spustit defaultní konfiguraci", href: "/emulator" },
]
