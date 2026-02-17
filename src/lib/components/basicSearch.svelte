<script lang="ts">
    import { goto } from "$app/navigation";
    import { API_URL } from "$lib/config";
    import type { Work } from "$lib/schemas/work";
    import { Combobox, Portal, useListCollection, type ComboboxRootProps } from '@skeletonlabs/skeleton-svelte';

    async function downloadSearchInfo() {
        if (works.length != 0) return;

        const res = await fetch(`${API_URL}/api/v1/works`)
        worksUnfiltered = await res.json()
        works = worksUnfiltered;
    }

    let worksUnfiltered: Work[] = $state([]);
    let works: Work[] = $state([]);

    const collection = $derived(
		useListCollection({
			items: works,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.id,
		}),
	);

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
        downloadSearchInfo();
		const filtered = works.filter((item) => item.label.toLowerCase().includes(event.inputValue.toLowerCase()));
		if (filtered.length > 0) {
			works = filtered;
		} else {
			works = worksUnfiltered;
		}
	};

    const onOpenChange = () => downloadSearchInfo();
    const onSelect = (details: any) => goto(`/work/${details.itemValue}`)
</script>

<div>
    <span class="text-lg">Vyhledat podle názvu</span>
    <div class="flex mt-2">
        <Combobox placeholder="Název díla" {collection} {onOpenChange} {onInputValueChange} onSelect={onSelect}>
            <Combobox.Control>
                <Combobox.Input />
                <Combobox.Trigger />
            </Combobox.Control>
            <Portal>
                <Combobox.Positioner>
                    <Combobox.Content>
                        {#each works as item (item.id)}
                            <Combobox.Item {item}>
                                <Combobox.ItemText>{item.label}</Combobox.ItemText>
                                <Combobox.ItemIndicator />
                            </Combobox.Item>
                        {/each}
                    </Combobox.Content>
                </Combobox.Positioner>
            </Portal>
        </Combobox>
        <a href="search" class="ml-1 btn preset-filled">
            <span>Rozšířené vyhledávání</span>
        </a>
    </div>
</div>
