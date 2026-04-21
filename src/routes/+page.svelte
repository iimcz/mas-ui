<script>
    import { faPlus, faGamepad } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import BasicSearch from "$lib/components/basicSearch.svelte";

    import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];
</script>

<div class="container mx-auto flex h-full items-center justify-center">
    <div class="m-4 flex w-4/6 flex-col space-y-10">
        <BasicSearch />
        <hr />
        <div>
            <span class="text-lg">Díla</span>
            <div class="mt-2 flex space-x-4">
                <a href="search?filter=work" class="btn grow preset-filled">
                    <Fa icon={faGamepad} />
                    <span>Prohlížet díla</span>
                </a>
                <a href="work/add" class="btn grow preset-filled">
                    <Fa icon={faPlus} />
                    <span>Import nového díla</span>
                </a>
            </div>
        </div>
    </div>
</div>
