<script>

    import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

</script>
<div class="container h-full mx-auto flex justify-center">
	<div class="flex w-4/6 space-y-10 flex-col m-4">
		<div>
			<span>Vyhledat podle názvu</span>
			<div class="flex">
				<input class="input w-100" title="Vyhledat dle názvu" type="text" placeholder="Název objektu" />
				<a href="search" class="ml-1 btn variant-filled">Rozšířené vyhledávání</a>
			</div>
		</div>
		<hr/>
		<a href="artefacts/add" class="btn variant-filled">Vytvořit nový objekt</a>
		<div>
		<textarea class="textarea" rows="6" placeholder="Zadejte dotaz pro AI vyhledávání..." />

			<a href="search" class="ml-1 float-right btn variant-filled">
				<Fa icon={faPaperPlane} />
				<span>Odeslat dotaz</span>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
</style>
