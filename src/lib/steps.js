import { writable } from 'svelte/store';

/**
 * @type {{name: string, href: string}[]}
 */
export let artefactSteps = [
    {
        name: "Typ média",
        href: "/work/[id]/version/[id]/artefact/add/media"
    },
    {
        name: "Návod pro digitalizaci",
        href: "/work/[id]/version/[id]/artefact/add/digitalizationguide"
    },
    {
        name: "Digitalizace",
        href: "/work/[id]/version/[id]/artefact/add/log"
    },
    {
        name: "Informace o artefaktu",
        href: "/work/[id]/version/[id]/artefact/add/info"
    },
];

/**
 * @type {{name: string, href: string}[]}
 */
export let configSteps = [
    {
        name: "Platforma",
        href: "/work/[id]/version/[id]/gameobject/add/platform"
    },
    {
        name: "Emulátor",
        href: "/work/[id]/version/[id]/gameobject/add/emulator"
    },
    {
        name: "Konverze artefaktů",
        href: "/work/[id]/version/[id]/gameobject/add/log"
    },
    {
        name: "Konfigurace",
        href: "/work/[id]/version/[id]/gameobject/add/configuration"
    }
];

export const unlockedStep = writable(0);
export const currentStep = writable(0)
export const steps = writable(artefactSteps)
