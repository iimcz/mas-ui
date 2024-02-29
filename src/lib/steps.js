import { writable } from 'svelte/store';

/**
 * @type {{name: string, href: string}[]}
 */
export let artefactSteps = [
    {
        name: "Typ média",
        href: "/artefacts/add"
    },
    {
        name: "Návod pro digitalizaci",
        href: "/artefacts/guide"
    },
    {
        name: "Digitalizace",
        href: "/log"
    },
    {
        name: "Informace o artefaktu",
        href: "/artefacts/info"
    },
];

/**
 * @type {{name: string, href: string}[]}
 */
export let configSteps = [
    {
        name: "Platforma",
        href: "/wizard/platform"
    },
    {
        name: "Emulátor",
        href: "/wizard/emulator"
    },
    {
        name: "Konverze artefaktů",
        href: "/log"
    },
    {
        name: "Konfigurace",
        href: "/wizard/configuration"
    },
    {
        name: "Výběr profilu",
        href: "/"
    },
];

export const unlockedStep = writable(0);
export const currentStep = writable(0)
export const steps = writable(artefactSteps)
