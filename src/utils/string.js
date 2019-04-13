export function toNumber(string) {
    return string.replace(/^(?:.*?)((?:\d+)?(?:\.)?(?:\d+)?)(?:.*)$/g, '$1');
}
