<script>
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import AiChat from "$lib/components/aiChat.svelte";
    import BasicSearch from "$lib/components/basicSearch.svelte";

	import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];
</script>

<div class="container h-full mx-auto flex justify-center">
	<div class="flex w-4/6 space-y-10 flex-col m-4">
		<BasicSearch/>
		<hr/>
		<div class="flex flex-col space-y-4">
			<a href="work/add" class="btn variant-filled">
				<Fa icon={faPlus} />
				<span>Vytvořit nové dílo</span>
			</a>
		</div>
		<AiChat/>
	</div>
</div>
