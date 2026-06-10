import type { ExplorationTypeEnum } from "./exploration/exploration";
import type { PlayableObject } from "./playableObject";

export interface Process<T extends ProcessDetail> {
    id: string;
    status: ProcessStatus;
    statusDetail: T;
    startTime: string;
}

export interface ProcessDetail {}

export interface DigitalizationDetail extends ProcessDetail {
    toolId: string;
    toolMessage: string;
}

export interface ConversionDetail extends ProcessDetail {
    emulatorId: string;
    artefactIds: string[];
    toolMessage: string;
}

export interface EmulationDetail extends ProcessDetail {
    isGpuPassthrough: boolean;
    isUsbPassthrough: boolean;
    other: string;
}

export interface UploadDetail extends ProcessDetail {}

export interface ExplorationDetail extends ProcessDetail {
    streamUrl: string;
    state: ExplorationTypeEnum;
    latestParsedPlayable: PlayableObject | null;
}

export interface ProcessList {
    digitalizationProcesses: Process<DigitalizationDetail>[];
    conversionProcesses: Process<ConversionDetail>[];
    emulationProcesses: Process<EmulationDetail>[];
    uploadProcesses: Process<UploadDetail>[];
    explorationProcesses: Process<ExplorationDetail>[];
}

export enum ProcessStatus {
    Initialization = "Initialization",
    Running = "Running",
    WaitingForInput = "WaitingForInput",
    WaitingForProcess = "WaitingForProcess",
    Failed = "Failed",
    Success = "Success",
    Restarting = "Restarting"
}
