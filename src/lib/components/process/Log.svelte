<script>
    import Fa from "svelte-fa";
    import { faDownload } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";

    /**
    * @type {string}
    */
    export let url;

    let log = "";
    let interval = 0;

    onMount(() => {
        interval = setInterval(async () => {
            const res = await fetch(url);
            log = await res.text();
            textArea.scrollTop = textArea.scrollHeight;
        }, 1000)

        textArea.scrollIntoView({ behavior: 'smooth' });
        return () => clearInterval(interval);
    })

    /**
     * @type {HTMLTextAreaElement}
     */
    let textArea;
</script>

<div>
    <textarea bind:this={textArea} disabled bind:value={log} class="textarea resize-none cursor-override" rows="15" />
    <a target="_blank" href={url} class="btn variant-filled mt-2 float-right">
        <Fa icon={faDownload}/>
        <span>Stáhnout log</span>
    </a>
</div>
