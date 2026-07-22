export type ArtefactListOptions = {
    formats: { [key: string]: string };
};

export type ArtefactUpdate = {
    label: string;
    version: string;
    format: string;
    internalNote: string;
    type: ArtefactTypeEnum;
    physicalMediaType: PhysicalMediaTypeEnum;
};

export type Artefact = {
    id: string;
    label: string;
    version: string;
    fileName: string;
    repoUrl: string;
    digitalObjectType: string;
    format: string;
    fileSize: number;
    mediaInfoReport: string;
    internalNote: string;
    type: ArtefactTypeEnum;
    physicalMediaType: PhysicalMediaTypeEnum;
    paratextIds: string[];
    versionIds: string[];
};

// TODO: this will be later dynamically loaded from CA (via the backend)
export enum ArtefactFormatEnum {
    ImageGIF = "image_gif",
    ImageJPEG = "image_jpeg",
    ImagePJPEG = "image_pjpeg",
    ImagePNG = "image_png",
    ImageSVG = "image_svg_xml",
    PDF = "pdf",
    PNG = "png",
    TextCSV = "csv"
}

export enum ArtefactTypeEnum {
    IsoImage = "IsoImage",
    ZipArchive = "ZipArchive",
    SfmFloppy = "SfmFloppy",
    WindowsBinary = "WindowsBinary",
    LinuxBinary = "LinuxBinary",
    WavAudio = "WavAudio",
    Unknown = "Unknown"
}

export enum PhysicalMediaTypeEnum {
    Floppy35 = "Floppy35",
    Floppy54 = "Floppy54",
    CD = "CD",
    DVD = "DVD",
    Flash = "Flash",
    AudioCassette = "AudioCassette",
    None = "None",
    Unknown = "Unknown"
}
