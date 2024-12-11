<script>
    import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    import { Autocomplete } from '@skeletonlabs/skeleton';
    import { popup } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { API_URL } from "$lib/config";

    async function downloadSearchInfo() {
        if (works.length != 0) return;

        const res = await fetch(`${API_URL}/api/v1/works`)
        works = await res.json()
        searchOptions = works.map(w => { return {label: w.title, value: w.id }})
    }

    /** @type {import("$lib/schemas/work").Work[]} */
    let works = [];

	/**
	 * @type import("@skeletonlabs/skeleton").PopupSettings
	 */
	let popupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom',
	};

	/**
	 * @type import("@skeletonlabs/skeleton").AutocompleteOption<string>[]
	 */
	let searchOptions = [];
    let search = "";

	/**
     * @param { CustomEvent<import("@skeletonlabs/skeleton").AutocompleteOption<string>> } event
     */
	function onSearchSelection(event) {
		goto(`/work/${event.detail.value}`);
	}

    $: {
        searchOptions = works
            .map(w => { return {label: w.title, value: w.id }})
            .filter(w => w.label.toLowerCase().includes(search.toLowerCase()))
    }
</script>

<div>
    <span class="text-lg">Vyhledat podle názvu</span>
    <div class="flex mt-2">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
            <div class="input-group-shim">
                <Fa icon={faMagnifyingGlass} />
            </div>

            <input bind:value={search} on:focus={downloadSearchInfo} use:popup={popupSettings} title="Vyhledat dle názvu" type="search" placeholder="Název objektu" />
            <button class="variant-filled-secondary">Vyhledat</button>
        </div>
        <a href="search" class="ml-1 btn variant-filled">
            <span>Rozšířené vyhledávání</span>
        </a>
    </div>

    <div data-popup="popupAutocomplete" class="card w-full max-w-sm max-h-48 p-4 overflow-y-auto" tabindex="-1">
        <Autocomplete bind:input={search} options={searchOptions} on:selection={onSearchSelection} />
    </div>
</div>
