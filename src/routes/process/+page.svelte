<script lang="ts">
    import Datatable from "$lib/components/Datatable.svelte";
    import HeaderContainer from "$lib/components/HeaderContainer.svelte";
    import JsonStatusDetail from "$lib/components/process/JsonStatusDetail.svelte";
    import { faRefresh } from "@fortawesome/free-solid-svg-icons";
    import type { PageProps } from "./$types";
    import Fa from "svelte-fa";
    import { invalidateAll } from "$app/navigation";
    import { toaster } from "$lib/toaster";
    import { PUBLIC_API_URL as API_URL } from "$env/static/public";

    function stopProcess(process: Process<any>) {
        fetch(`${API_URL}/api/v1/processes/${process.id}/stop`, { method: "POST" });
        toaster.info({ title: "Odeslán signál k zastavení procesu", id: "stop" });
        invalidateAll();
    }

    const tableColumns = [
        { name: "Id", key: "id", canSort: true },
        { name: "Status", key: "status", canSort: true },
        { name: "Čas spuštění", key: "startTime", canSort: true },
        { name: "Detail", key: "statusDetail", customComponent: JsonStatusDetail, canSort: true },
        { name: "Ukončit", key: "stop", onClick: stopProcess, canSort: false }
    ];

    let { data }: PageProps = $props();
    let processes: Process<any>[] = $derived.by(() => {
        return [
            ...data.conversionProcesses,
            ...data.digitalizationProcesses,
            ...data.emulationProcesses,
            ...data.uploadProcesses,
            ...data.explorationProcesses
        ];
    });
</script>

<HeaderContainer title="Procesy">
    <button
        class="btn preset-filled"
        onclick={() => {
            invalidateAll();
            toaster.info({ title: "Obnovování dat...", id: "refresh" });
        }}
    >
        <Fa icon={faRefresh} />
        Obnovit
    </button>
    <Datatable data={processes} columns={tableColumns} />
</HeaderContainer>
