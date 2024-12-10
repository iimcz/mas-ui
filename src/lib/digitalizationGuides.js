/**
* @typedef {{
*  steps: string[],
*  images: string[],
*  faq: { title: string, content: string }[]
* }} DigitalizationGuide
*
* @type {Object.<string, DigitalizationGuide>}
*/
export const digitalizationGuides = {
    "greaseweazle-35-diskette": {
        "steps": [
            "greaseweazle-35-diskette.step1",
            "greaseweazle-35-diskette.step2"
        ],
        "images": [
            "greaseweazle-35-diskette.image1",
            "greaseweazle-35-diskette.image2",
        ],
        "faq": [
            { title: "greaseweazle-35-diskette.title1", content: "greaseweazle-35-diskette.content1" },
            { title: "greaseweazle-35-diskette.title2", content: "greaseweazle-35-diskette.content2" },
            { title: "greaseweazle-35-diskette.title3", content: "greaseweazle-35-diskette.content3" },
        ]
    },
    "ffmpeg-rec-cassette-wav": {
        "steps": [
            "ffmpeg-rec-cassette-wav.step1",
            "ffmpeg-rec-cassette-wav.step2",
        ],
        "images": [
            "ffmpeg-rec-cassette-wav.image1",
            "ffmpeg-rec-cassette-wav.image2",
        ],
        "faq": [
            { title: "ffmpeg-rec-cassette-wav.title1", content: "ffmpeg-rec-cassette-wav.content1" },
        ]
    }
};
