<script lang="ts">
    let { theme = $bindable() }: { theme: string } = $props();
</script>

<span class="flex items-center gap-2">
  <span>Vzhled</span>
  <select class="select" bind:value={theme}>
      <option value="dark">Tmavý</option>
      <option value="light">Světlý</option>
  </select>
</span>
