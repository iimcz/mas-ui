<script>
    import { faEdit, faEye, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
    import Fa from "svelte-fa";
    import WorkForm from "./workForm.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
</script>

<HeaderContainer title="Metadata díla">
    <div class="grid grid-cols-[2fr_1fr] gap-2">
        <WorkForm/>
        <div class="flex flex-col gap-2">
            <div class="card flex flex-col p-2">
                <div>
                    <span class="text-xl font-bold p-4">Zdroje dat z internetu</span>
                    <button class="btn variant-filled-primary float-right">
                        <Fa icon={faPlus}/>
                    </button>
                </div>
                <div class="flex flex-col p-4 space-y-2">
                    <div>
                        <a href="http://abecedaher.cz">Web: http://abecedaher.cz</a>
                        <button class="btn variant-filled-error float-right">
                            <Fa icon={faTrash}/>
                        </button>
                        <button class="btn variant-filled-secondary float-right mr-1">
                            <Fa icon={faEdit}/>
                        </button>
                    </div>
                    <div>
                        <a href="#">Soubor: recenze.docx</a>
                        <button class="btn variant-filled-error float-right">
                            <Fa icon={faTrash}/>
                        </button>
                        <button class="btn variant-filled-secondary float-right mr-1">
                            <Fa icon={faEdit}/>
                        </button>
                    </div>
                </div>
            </div>
            <div class="card flex flex-col p-2">
                <div>
                    <span class="text-xl font-bold p-4">Neherní soubory</span>
                    <button class="btn variant-filled-primary float-right">
                        <Fa icon={faPlus}/>
                    </button>
                </div>
                <div class="flex flex-col p-4 space-y-2">
                    <div>
                        <a href="#">Manual.pdf</a>
                        <button class="btn variant-filled-error float-right">
                            <Fa icon={faTrash}/>
                        </button>
                        <button class="btn variant-filled-secondary float-right mr-1">
                            <Fa icon={faEye}/>
                        </button>
                    </div>
                    <div>
                        <a href="#">Obal.png</a>
                        <button class="btn variant-filled-error float-right">
                            <Fa icon={faTrash}/>
                        </button>
                        <button class="btn variant-filled-secondary float-right mr-1">
                            <Fa icon={faEye}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</HeaderContainer>
