import { ArtefactTypeEnum } from "./artefact";

export type DigitalObject = {
    id: string;
    label: string;
    version: string;
    fileName: string;
    repoUrl: string;
    digitalObjectType: DigitalObjectType;
    format: string;
    fileSize: number;
    mediaInfoReport: string;
    internalNote: string;
    importedAt: string;
    exportedAt: string;
};

export type ArtefactUploadMetadata = {
    artefactType: ArtefactTypeEnum;
    workVersion: string; // TODO: Multiple work versions (game collections)?
};

export type DigitalObjectUploadMetadata = {
    label: string;
    version: string;
    fileName: string;
    digitalObjectType: DigitalObjectType;
    artefactMetadata?: ArtefactUploadMetadata;
};

export enum DigitalObjectType {
    GameArtefact = "GameArtefact",
    PlayableObject = "PlayableObject",
    Modification = "Modification",
    UnplayableParatext = "UnplayableParatext"
}
