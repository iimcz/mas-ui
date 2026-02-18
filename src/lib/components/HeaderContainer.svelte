<script>
    let { title, children } = $props();
</script>

<div class="container h-full">
    <div class="flex w-5/6 space-y-5 flex-col mx-4 h-full">
        <h1 class="text-3xl mt-8">{title}</h1>
        {@render children?.()}
        <div class="mb-4"></div>
    </div>
</div>
