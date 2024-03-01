<script>
    import { faCopy, faEdit, faEye, faGear, faPerson, faPlay, faPlus, faRecordVinyl, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
    import { Tab, TabGroup } from "@skeletonlabs/skeleton";
    import Fa from "svelte-fa";

    let tabSet = 0;
</script>

<div class="container h-full mx-auto flex justify-center">
    <div class="flex w-5/6 space-y-10 flex-col m-4">
        <h1 class="text-3xl mt-4">Metadata herního objektu</h1>
        <div class="grid grid-cols-[2fr_1fr] gap-2">
            <div class="card flex p-2 flex-col">
                <span class="text-xl font-bold p-4">Popis</span>
                <TabGroup>
                    <Tab bind:group={tabSet} name="tab1" value={0}>
                        <span>Strukturovaný popis</span>
                    </Tab>
                    <Tab bind:group={tabSet} name="tab2" value={1}>Volný text (AI)</Tab>
                    <!-- Tab Panels --->
                    <svelte:fragment slot="panel">
                        {#if tabSet === 0}
                            <form class="form border border-surface-500 m-2 p-4 space-y-2 rounded-container-token">
                                <p>Název hry</p>
                                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                    <input type="text" placeholder="" />
                                </div>
                                <p>Rok vydání</p>
                                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                    <input type="text" value="2022" />
                                </div>
                                <p>Žánr</p>
                                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                    <input type="text" value="RPG" />
                                </div>
                                <p>Typ distribuce</p>
                                    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                                    <input type="text" value="Download" />
                                </div>
                            </form>
                        {:else if tabSet === 1}
                            <textarea class="textarea resize-none" rows="8" placeholder="Vložený text bude automaticky přidát do AI databáze..." />
                        {/if}
                    </svelte:fragment>
                </TabGroup>
            </div>
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
    </div>
</div>
