<script>
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Akviziční stanice</strong>
				<a
					class="btn btn-sm variant-ghost-surface ml-2"
					href="/"
				>
					Vyhledat
				</a>
				<a
					class="btn btn-sm variant-ghost-surface ml-2"
					href="artefacts/add"
				>
					Nový artefakt
				</a>
				<a
					class="btn btn-sm variant-ghost-surface ml-2"
					href="/gameobjects"
				>
					Herní objekty
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
