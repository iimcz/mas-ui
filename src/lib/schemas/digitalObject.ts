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

export enum DigitalObjectType
{
    GameArtefact = "GameArtefact",
    PlayableObject = "PlayableObject",
    Modification = "Modification",
    UnplayableParatext = "UnplayableParatext",
}
