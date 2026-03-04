export type Artefact = {
    id: string;
    fileName: string;
    internalNote: string;
    websiteUrl: string;
    digitalObjectType: string;
    format: string;
    fileSize: number;
    quality: string;
    type: ArtefactTypeEnum;
    physicalMediaState: PhysicalMediaStateEnum;
    physicalMediaType: PhysicalMediaTypeEnum;
    paratextIds: string[];
    versionIds: string[];
};

export enum PhysicalMediaStateEnum {
    Good = "Good",
    Damaged = "Damaged",
    Unreadable = "Unreadable"
}

export enum PhysicalMediaTypeEnum {
    Floppy35 = "Floppy35",
    Floppy54 = "Floppy54",
    CD = "CD",
    DVD = "DVD",
    Flash = "Flash",
    AudioCassette = "AudioCassette",
    None = "None",
    Unknow = "Unknown"
}

export enum ArtefactTypeEnum {
    IsoImage = "IsoImage",
    ZipArchive = "ZipArchive",
    SfmFloppy = "SfmFloppy",
    WindowsBinary = "WindowsBinary",
    LinuxBinary = "LinuxBinary",
    WavAudio = "WavAudio",
    Unknown = "Unknown",
}
