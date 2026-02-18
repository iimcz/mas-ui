<script lang="ts">
    import { CA_URL } from "$lib/config";
    import WorkForm from "./workForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import Alert from '$lib/components/Alert.svelte';
    import { currentSidebar, currentRoute, workLinks } from "$lib/components/sidebar/links";
    import Fa from "svelte-fa";
    import { faChevronLeft, faDatabase } from "@fortawesome/free-solid-svg-icons";

    $currentSidebar = workLinks;
    $currentRoute = "workDetail";

    let { data } = $props();
</script>

<HeaderContainer title={data.label}>
    <div class="grid grid-cols-[1fr] gap-2">
        <Alert class="preset-outlined-primary-500">
            <h3 class="flex gap-2 items-center font-semibold">
                <Fa icon={faChevronLeft}/>
                Další kroky
            </h3>
            <p>
                Po vytvoření díla je nutné vytvořit verzi v databázi CollectiveAccess.<br/>
                Následně se zde nahrají nové změny, včetně přidaných verzí.
            </p>
            <div>
                <a href="{CA_URL}" target="_blank" class="btn preset-filled"><Fa class="mr-2" icon={faDatabase}/>Collective Access</a>
            </div>
        </Alert>
        <h2 class="text-2xl mt-4">Metadata díla</h2>
        <WorkForm data={data}/>
    </div>
</HeaderContainer>
