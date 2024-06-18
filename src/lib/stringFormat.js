/**
     * @param {string} url
     * @param {Object.<string, string>} data
     */
export function stringFormat(url, data) {
    return Object.keys(data).reduce((acc, key) => acc.replaceAll(`\[${key}\]`, data[key]), url)
}
