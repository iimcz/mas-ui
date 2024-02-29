<script>
    import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    let message = "";

    function sendMessage() {
        message = "Zde se zobrazí odpověď";
    }
</script>

<div class="relative">
    <textarea bind:value={message} class="textarea resize-none" rows="8" placeholder="Zadejte dotaz pro AI vyhledávání..." />
    <button on:click={sendMessage} class="absolute right-0 bottom-0 m-4 btn variant-filled">
        <Fa icon={faPaperPlane} />
        <span>Odeslat dotaz</span>
    </button>
</div>

<style>

</style>
