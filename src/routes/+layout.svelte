<script>
	import './layout.css';
	import { AppBar, Dialog, Toast } from '@skeletonlabs/skeleton-svelte';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
	import Fa from 'svelte-fa';
    import { faSave } from '@fortawesome/free-solid-svg-icons';
	import { _ } from 'svelte-i18n'

    import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<!-- App Shell -->
<Dialog />
<!--
<Toast />
-->
<div>
	<AppBar>
		<AppBar.Lead>
			<a href="/" class="flex items-center font-bold text-xl uppercase mr-4">
				<Fa class="mr-2" icon={faSave}/>
				{$_('page_title')}
			</a>
		</AppBar.Lead>
		<AppBar.Trail>
			<LocaleSwitcher/>
		</AppBar.Trail>
	</AppBar>
	<Sidebar/>
	<!-- Page Route Content -->
	{@render children?.()}
</div>
