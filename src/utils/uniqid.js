const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

export function now() {
    const time = Date.now();
    const last = now.last || time;
    return now.last = time > last ? time : last + 1;
}

/**
 * Generate a random uuid.
 * Based on http://www.broofa.com/Tools/Math.uuid.htm
 *
 * @param {number} len - the desired number of characters
 * @param {number} [radix] - the number of allowable values for each character.
 * @returns {string} - returns ID of the specified length, and radix
 */
export function uuid(len, radix = chars.length) {
    // Define uuid
    const uuid = [];

    // Compact form if len defined
    if (len) {
        for (let i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        // Rfc4122 requires these characters
        uuid[8] = '-';
        uuid[13] = '-';
        uuid[14] = '4';
        uuid[18] = '-';
        uuid[23] = '-';

        // Fill in random data. At i === 19 set the high bits of clock sequence as per rfc4122, sec. 4.1.5
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                const r = 0 | Math.random() * 16;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    // Return uuid string
    return uuid.join('');
}

export function time(prefix = '') {
    return prefix + now().toString(36);
}

export default function (prefix = '') {
    return time(prefix) + uuid(4);
};
