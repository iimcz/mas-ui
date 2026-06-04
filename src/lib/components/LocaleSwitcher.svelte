<script lang="ts">
    import { faGlobe, faCaretDown } from "@fortawesome/free-solid-svg-icons";
    import { Menu, Portal } from "@skeletonlabs/skeleton-svelte";
    import Fa from "svelte-fa";
    import { locale, locales, _ } from "svelte-i18n";
</script>

<Menu onSelect={(e) => ($locale = e.value)}>
    <Menu.Trigger class="btn py-2 hover:preset-tonal">
        <Fa icon={faGlobe} />
        {$_("language")}
        <Fa icon={faCaretDown} />
    </Menu.Trigger>
    <Portal>
        <Menu.Positioner>
            <Menu.Content>
                {#each $locales as locale}
                    <Menu.Item value={locale}>
                        <Menu.ItemText>{$_(`locale_name.${locale}`)}</Menu.ItemText>
                    </Menu.Item>
                {/each}
            </Menu.Content>
        </Menu.Positioner>
    </Portal>
</Menu>
