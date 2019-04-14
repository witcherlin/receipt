export function toUpperCaseFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function toNumber(string) {
    return string.replace(/^(?:.*?)((?:\d+)?(?:\.)?(?:\d+)?)(?:.*)$/g, '$1');
}
