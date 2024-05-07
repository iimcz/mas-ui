<script>
    export let title;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-5 flex-col m-4">
        <h1 class="text-3xl mt-4">{title}</h1>
        <slot/>
    </div>
</div>
