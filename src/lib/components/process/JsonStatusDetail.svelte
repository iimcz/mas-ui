<script lang="ts">
    let { statusDetail }: { statusDetail: ProcessDetail } = $props();
</script>

<pre>
{JSON.stringify(statusDetail, null, 2)}
</pre>
