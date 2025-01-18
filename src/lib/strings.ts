export const insert = (s: string, sub: string, idx: number): string => s.slice(0, idx) + sub + s.slice(idx);

export const surround = (s: string, sub: string, begin: number, end: number): string => {
    s = insert(s, sub, begin);
    s = insert(s, sub, end + sub.length);

    return s;
}

export const getLineStartIndex = (text: string, index: number): number => {
    const lines = text.split('\n');

    let cur = 0;

    for (let i = 0; i < lines.length; i++) {
        const lineLength = lines[i].length + 1;

        if (cur + lineLength > index) {
            return cur;
        }

        cur += lineLength;
    }

    return -1;
}

export const truncate_address = (address: string, len: number = 6): string => {
    if (address.length < 2 * len) return address;

    return `${address.slice(0, len)}...${address.slice(-len)}`;
}

export const capitalize = (word: string): string => {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}