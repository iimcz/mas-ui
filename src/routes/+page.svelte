<script>
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import AiChat from "../components/aiChat.svelte";
    import BasicSearch from "../components/basicSearch.svelte";
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="flex w-4/6 space-y-10 flex-col m-4">
		<BasicSearch/>
		<hr/>
		<a href="artefacts/add" class="btn variant-filled">
			<Fa icon={faPlus} />
			<span>Vytvořit nový objekt</span>
		</a>
		<AiChat/>
	</div>
</div>

<style lang="postcss">
</style>
