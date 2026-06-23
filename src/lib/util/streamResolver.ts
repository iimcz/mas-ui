export function resolveStreamUrl(url: string): string {
    if (import.meta.env.PUBLIC_REPLACE_STREAM) {
        return url.replace("localhost", "192.168.22.55");
    }

    return url;
}
