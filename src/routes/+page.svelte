<script>
    import { faPlus, faGamepad } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import BasicSearch from "$lib/components/basicSearch.svelte";

	import { currentSidebar } from "$lib/components/sidebar/links";
    $currentSidebar = [];
</script>

<div class="container h-full mx-auto flex items-center justify-center">
	<div class="flex w-4/6 space-y-10 flex-col m-4">
		<BasicSearch/>
		<hr/>
		<div>
			<span class="text-lg">Díla</span>
			<div class="flex space-x-4 mt-2">
				<a href="search?filter=work" class="btn preset-filled grow">
					<Fa icon={faGamepad} />
					<span>Existující díla</span>
				</a>
				<a href="work/add" class="btn preset-filled grow">
					<Fa icon={faPlus} />
					<span>Vytvořit nové dílo</span>
				</a>
			</div>
		</div>
	</div>
</div>
