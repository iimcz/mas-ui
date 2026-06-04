interface Process<T extends ProcessDetail> {
    id: string;
    status: ProcessStatus;
    statusDetail: T;
    startTime: string;
}

interface ProcessDetail {}

interface DigitalizationDetail extends ProcessDetail {
    toolId: string;
    toolMessage: string;
}

interface ConversionDetail extends ProcessDetail {
    emulatorId: string;
    artefactIds: string[];
    toolMessage: string;
}

interface EmulationDetail extends ProcessDetail {
    isGpuPassthrough: boolean;
    isUsbPassthrough: boolean;
    other: string;
}

interface UploadDetail extends ProcessDetail {}

interface ProcessList {
    digitalizationProcesses: Process<DigitalizationDetail>[];
    conversionProcesses: Process<ConversionDetail>[];
    emulationProcesses: Process<EmulationDetail>[];
    uploadProcesses: Process<UploadDetail>[];
}

enum ProcessStatus {
    Initialization = "Initialization",
    Running = "Running",
    WaitingForInput = "WaitingForInput",
    WaitingForProcess = "WaitingForProcess",
    Failed = "Failed",
    Success = "Success",
    Restarting = "Restarting"
}
