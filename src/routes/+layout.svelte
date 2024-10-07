<script>
	import '../app.postcss';
	import { AppShell, AppBar, Modal, Toast } from '@skeletonlabs/skeleton';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import Fa from 'svelte-fa';
    import { faSave } from '@fortawesome/free-solid-svg-icons';
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
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar shadow="shadow-2xl">
			<svelte:fragment slot="lead">
				<a href="/" class="flex items-center font-bold text-xl uppercase mr-4">
					<Fa class="mr-2" icon={faSave}/>
					{$_('page_title')}
				</a>
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
