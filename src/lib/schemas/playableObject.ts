export interface PlayableObject {
    id: string;
    label: string;
    note: string;
    emulatorSlug: string;
    creationDate: string;
    versionId: string;
    digitalObjectIds: string[];
}

export interface PlayableObjectUpdate {
    label: string;
    note: string;
}
