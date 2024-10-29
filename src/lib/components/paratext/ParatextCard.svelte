<script>
    import { getParatextThumbnail, downloadParatext } from "$lib/schemas/paratext";
    import MediaCard from "../mediaCard.svelte";

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
    <div>{paratext.description}</div>
    <div>Zdroj: {paratext.source}</div>
</MediaCard>
