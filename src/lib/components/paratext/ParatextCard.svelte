<script>
    import { getParatextThumbnail, downloadParatext } from "$lib/schemas/paratext";
    import Fa from "svelte-fa";
    import MediaCard from "../mediaCard.svelte";
    import { faEdit } from "@fortawesome/free-solid-svg-icons";
    import { goto } from "$app/navigation";

    function editParatext() {
        goto(`/paratext/${paratext.id}`);
    }

    /**
     * @typedef {Object} Props
     * @property {any} paratext
     */

    /** @type {Props} */
    let { paratext } = $props();

    /** @type {string[]}*/
    let tags = $state([]);
    if (paratext.downloadable) tags = ["Stáhnutelné"];
</script>

<MediaCard
    title={paratext.name}
    {tags}
    image={getParatextThumbnail(paratext)}
    onclick={() => downloadParatext(paratext)}
>
    {#snippet sideIcon()}
        <button onclick={editParatext} class="mr-2 btn-icon preset-filled">
            <Fa icon={faEdit} />
        </button>
    {/snippet}

    <div>{paratext.description}</div>
    <div>Zdroj: {paratext.source}</div>
</MediaCard>
