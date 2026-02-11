<script>
    import Fa from "svelte-fa";
    import { faDownload } from "@fortawesome/free-solid-svg-icons";
    import { onMount } from "svelte";


    /**
     * @typedef {Object} Props
     * @property {string} url
     */

    /** @type {Props} */
    let { url } = $props();

    let log = $state("");
    let interval = 0;

    onMount(() => {
        interval = setInterval(async () => {
            const res = await fetch(url);
            const newLog = await res.text();
            const isUpdated = newLog != log;

            if (isUpdated) {
                log = newLog;
                textArea.scrollTop = textArea.scrollHeight;
            }
        }, 1000)

        textArea.scrollIntoView({ behavior: 'smooth' });
        return () => clearInterval(interval);
    })

    /**
     * @type {HTMLTextAreaElement}
     */
    let textArea = $state();
</script>

<div>
    <textarea bind:this={textArea} disabled bind:value={log} class="textarea resize-none cursor-override" rows="15"></textarea>
    <a target="_blank" href={url} class="btn preset-filled mt-2 float-right">
        <Fa icon={faDownload}/>
        <span>Stáhnout log</span>
    </a>
</div>
