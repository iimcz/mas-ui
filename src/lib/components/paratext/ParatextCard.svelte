<script>
    import { getParatextThumbnail, downloadParatext } from "$lib/schemas/paratext";
    import Fa from "svelte-fa";
    import MediaCard from "../mediaCard.svelte";
    import { faEdit } from "@fortawesome/free-solid-svg-icons";
    import { goto } from "$app/navigation";

    function editParatext() {
        goto(`/paratext/${paratext.id}`)
    }

    /** @type import('$lib/schemas/paratext').Paratext */
    export let paratext;

    /** @type {string[]}*/
    let tags = []
    if (paratext.downloadable) tags = ["Stáhnutelné"]
</script>

<MediaCard
    title={paratext.name}
    tags={tags}
    image={getParatextThumbnail(paratext)}
    on:click={() => downloadParatext(paratext)}>
    <svelte:fragment slot="sideIcon">
        <button on:click={editParatext} class="btn-icon variant-filled mr-2">
            <Fa icon={faEdit}/>
        </button>
    </svelte:fragment>

    <div>{paratext.description}</div>
    <div>Zdroj: {paratext.source}</div>
</MediaCard>
