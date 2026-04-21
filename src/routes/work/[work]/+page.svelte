<script lang="ts">
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";
    import WorkMetadata from "./WorkMetadata.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Alert from "$lib/components/Alert.svelte";
    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import Fa from "svelte-fa";
    import { faListCheck, faDatabase } from "@fortawesome/free-solid-svg-icons";

    $currentSidebar = workLinks;
    $currentRoute = "workDetail";

    let { data } = $props();
</script>

<HeaderContainer title={data.label}>
    <div class="grid grid-cols-[1fr] gap-2">
        <ol class="flex items-center gap-4">
            <li><a class="opacity-60 hover:underline" href="/">Vyhledávání</a></li>
            <li class="opacity-50" aria-hidden="true">&rsaquo;</li>
            <li>Dílo</li>
        </ol>
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex items-center gap-2 font-semibold">
                <Fa icon={faListCheck} />
                Další kroky
            </h3>
            <p>
                Po vytvoření díla je nutné vytvořit verzi v databázi CollectiveAccess.<br />
                Následně se zde nahrají nové změny, včetně přidaných verzí.
            </p>
            <div>
                <a
                    href="{API_URL}/api/v1/router/ca/work/edit/{data.id}"
                    target="_blank"
                    class="btn preset-filled"><Fa class="mr-2" icon={faDatabase} />Editovat v CA</a
                >
            </div>
        </Alert>
        <h2 class="mt-4 text-2xl">Metadata díla</h2>
        <WorkMetadata {data} />
    </div>
</HeaderContainer>
