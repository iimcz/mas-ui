<script>
    import Datatable from "$lib/components/client/Datatable.svelte";
    import { faPlus } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";

    const tableColumns = [
        { name: "Jméno", key: "name", canSort: true },
        { name: "Počet děl", key: "work_count", canSort: false },
        { name: "Akce", key: "name", canSort: false },
    ]
</script>


<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Osoby</h1>
        <Datatable columns={tableColumns}/>
        <div>
            <a href="/artefacts/add" class="btn variant-filled-primary float-right">
                <Fa icon={faPlus}/>
                <span>Přidat osobu</span>
            </a>
        </div>
    </div>
</div>
