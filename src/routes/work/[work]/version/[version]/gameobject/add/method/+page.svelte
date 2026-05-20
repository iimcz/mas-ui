<script lang="ts">
    import { currentSidebar, currentRoute, versionLinks } from "$lib/components/sidebar/links";
    import { faCogs, faWandSparkles } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    $currentSidebar = versionLinks;
    $currentRoute = "addGameObject";
</script>

<div class="container flex h-full">
    <div class="m-4 flex w-5/6 flex-col space-y-10">
        <h1 class="mt-4 text-3xl">Vyberte způsob vytvoření</h1>
        <div class="3xl:grid-cols-3 grid grid-cols-2 gap-4 text-center">
        <a href="wizard" class="relative card preset-outlined-primary-300-700 p-4 card-hover hover:scale-105">
            <button class="flex h-full">
                <div class="flex mx-4 pr-2 justify-center items-center">
                    <Fa size="lg" scale={2} icon={faWandSparkles}/>
                </div>
                <div class="space-y-1 text-left content-center">
                    <div class="text-lg font-bold">Automaticky</div>
                    <div>
                        Automatické vytvoření funguje pro starší paltfromy jako ZX Spectrum. Primárně navrženo pro nepoškozené digitální objekty vytvořené na akviziční stanici.
                    </div>
                </div>
            </button>
        </a>

        <div class="relative card preset-outlined-primary-300-700 p-4 card-hover hover:scale-105">
            <a href="exploration" class="flex h-full">
                <div class="flex mx-4 pr-2 justify-center items-center">
                    <Fa size="lg" scale={2} icon={faCogs}/>
                </div>
                <div class="space-y-1 text-left content-center">
                    <div class="text-lg font-bold">Manuálně</div>
                    <div>
                        Manuální vytvoření spustí virtuální stroj s předinstalovanými nástroji pro vytvoření herního balíčku.<br/>
                        Tento způsob je vhodný pro nové platformy, které nejsou podporovány automatickým vytvořením, nebo pokud hra vyžaduje specifické nastavení.
                    </div>
                </div>
            </a>
        </div>
        </div>
    </div>
</div>
