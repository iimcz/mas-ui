<script>
    import { locale, locales, _ } from 'svelte-i18n'
</script>

<span class="flex items-center gap-2">
  {$_("language")}
  <select class="select" bind:value={$locale}>
      {#each $locales as locale}
        <option value={locale}>{$_(`locale_name.${locale}`)}</option>
      {/each}
  </select>
</span>
