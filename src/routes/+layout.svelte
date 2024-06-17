<script>
	import '../app.postcss';
	import { AppShell, AppBar, Modal } from '@skeletonlabs/skeleton';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import { _ } from 'svelte-i18n'

	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
    import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<Modal />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="shadow-2xl">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase mr-4">{$_('page_title')}</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LocaleSwitcher/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Sidebar/>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
