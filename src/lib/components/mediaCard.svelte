<script>
    export let image = "";
    export let title = "";
    export let description = "";
    export let target = "";
</script>

<a href={target} class="card p-4 flex">
    {#if image != ""}
        <img width="200" height="200" src="{image}" class="mr-4 object-contain"/>
    {/if}

    <div class="text-left">
        <div class="text-lg font-bold">{title}</div>
        <div>
            {description}
        </div>
    </div>
</a>
