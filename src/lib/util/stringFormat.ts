export function stringFormat(url: string, data: Record<string, string>): string {
    return Object.keys(data).reduce((acc, key) => acc.replaceAll(`\[${key}\]`, data[key]), url);
}
