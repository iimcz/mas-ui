import { writable } from 'svelte/store';

/**
 * @type {{name: string, href: string}[]}
 */
export let artefactSteps = [
    {
        name: "Typ média",
        href: "/work/[work]/version/[version]/artefact/add"
    },
    {
        name: "Návod pro digitalizaci",
        href: "/work/[work]/version/[version]/artefact/add/[process]/digitalizationguide"
    },
    {
        name: "Digitalizace",
        href: "/work/[work]/version/[version]/artefact/add/[process]/log"
    },
    {
        name: "Informace o artefaktu",
        href: "/work/[work]/version/[version]/artefact/add/[process]/info"
    },
];

/**
 * @type {{name: string, href: string}[]}
 */
export let configSteps = [ // TODO: Probably match same pattern as artefact?
    {
        name: "Platforma",
        href: "/work/[work]/version/[version]/gameobject/add/platform"
    },
    {
        name: "Emulátor",
        href: "/work/[work]/version/[version]/gameobject/add/emulator"
    },
    {
        name: "Konverze artefaktů",
        href: "/work/[work]/version/[version]/gameobject/add/log"
    },
    {
        name: "Konfigurace",
        href: "/work/[work]/version/[version]/gameobject/add/configuration"
    }
];

export const unlockedStep = writable(0);
export const currentStep = writable(0)
export const steps = writable(artefactSteps)
