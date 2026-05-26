import type { ProgressStep } from "./components/progressStepBar.svelte";

export let artefactSteps: ProgressStep[] = [
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
    }
];

export let configSteps: ProgressStep[] = [
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

export let explorationSteps: ProgressStep[] = [
    {
        name: "Výběr prostředí + obejktů",
        href: "/work/[work]/version/[version]/gameobject/add"
    },
    {
        name: "Explorace",
        href: "/work/[work]/version/[version]/gameobject/add/exploration/[explorationRun]"
    },
    {
        name: "Obsah balíčku",
        href: "/work/[work]/version/[version]/gameobject/add/exploration/[explorationRun]/extract"
    },
    {
        name: "Ověření",
        href: "/work/[work]/version/[version]/gameobject/add/exploration/[explorationRun]/verify"
    },
    {
        name: "Finalizace",
        href: "/work/[work]/version/[version]/gameobject/add/exploration/[explorationRun]/finalize"
    }
];
