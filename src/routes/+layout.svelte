<script lang="ts">
	import './layout.css';
	import { CA_URL } from '$lib/config';
	import { _ } from 'svelte-i18n'

	import { AppBar, Dialog, Toast } from '@skeletonlabs/skeleton-svelte';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';

	import Fa from 'svelte-fa';
    import { faSave, faDatabase } from '@fortawesome/free-solid-svg-icons';
    import { currentSidebar } from '$lib/components/sidebar/links';

	let { children } = $props();
</script>

<Dialog />
<!--
<Toast />
-->
<div class="grid h-screen grid-rows-[auto_1fr]">
	<AppBar class="border-b border-surface-200-800 bg-surface-50-950/75 backdrop-blur-lg h-[70px]">
		<AppBar.Toolbar class="grid-cols-[1fr_auto] container mx-auto">
			<AppBar.Headline>
				<a href="/" class="flex items-center font-bold text-xl uppercase mr-4">
					<Fa class="mr-2" icon={faSave}/>
					{$_('page_title')}
				</a>
			</AppBar.Headline>
			<AppBar.Trail>
				<a href={CA_URL} target="_blank" class="flex items-center font-bold text-l uppercase mr-4">
					<Fa class="mr-2" icon={faDatabase}/>
					Collective Access
                </a>
				<LocaleSwitcher/>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>
	<div class="max-w-[80vw] w-full mx-auto grid grid-cols-[240px_1fr]">
		<Sidebar/>
		<main class:col-span-2={$currentSidebar.length == 0} class="ml-2">
			{@render children?.()}
		</main>
	</div>
</div>
