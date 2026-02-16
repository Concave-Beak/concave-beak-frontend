export function stringFormatMaxLength(
    stringBase: string,
    absoluteLength: number,
    shouldAddEllipsis: boolean,
): string {
    if (stringBase.length <= absoluteLength) {
        return stringBase;
    }

    if (shouldAddEllipsis) {
        const truncatedLength = Math.max(0, absoluteLength - '...'.length);
        return stringBase.slice(0, truncatedLength) + '...';
    }

    return stringBase.slice(0, absoluteLength);
}
