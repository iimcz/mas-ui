<script>
    export let image;
    export let title;
    export let description;
</script>

<div class="card p-4 flex">
    <img width="200" height="200" src="{image}" class="mr-2"/>
    <div>
        <h3>{title}</h3>
        <div>
            {description}
        </div>
    </div>
</div>
