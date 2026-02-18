import { writable } from 'svelte/store';

/**
 * @typedef {{name: string, href: string}} ProgressStep
 * @type {ProgressStep[]}
 */
export let artefactSteps = [
    {
        name: "Typ média",
        href: "/work/[work]/version/[version]/artefact/add"
    },
    {
        name: "Digitalizace",
        href: "/work/[work]/version/[version]/artefact/add/[process]"
    },
    {
        name: "Informace o digitálním objektu",
        href: "/work/[work]/version/[version]/artefact/add/[process]/info"
    },
];

/**
 * @type {ProgressStep[]}
 */
export let configSteps = [
    {
        name: "Platforma",
        href: "/work/[work]/version/[version]/gameobject/add/platform"
    },
    {
        name: "Digitální objekty + Emulátor",
        href: "/work/[work]/version/[version]/gameobject/add/[platform]"
    },
    {
        name: "Konverze digitálních objektů",
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
