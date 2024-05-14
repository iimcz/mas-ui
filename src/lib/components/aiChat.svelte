<script>
    import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import ButtonTextArea from "./ButtonTextArea.svelte";

    let message = "";

    function sendMessage() {
        message = "Zde se zobrazí odpověď";
    }
</script>

<ButtonTextArea on:click={sendMessage} bind:value={message} placeholder="Zadejte dotaz pro AI vyhledávání...">
    <Fa icon={faPaperPlane} />
    <span>Odeslat dotaz</span>
</ButtonTextArea>
