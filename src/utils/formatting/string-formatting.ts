export function stringFormatMaxLength(
  strBase: string,
  absoluteLength: number,
  shouldAddEllipsis: boolean
): string {
  if (strBase.length <= absoluteLength) {
    return strBase;
  }

  if (shouldAddEllipsis) {
    const truncatedLength = Math.max(0, absoluteLength - 3);
    return strBase.slice(0, truncatedLength) + "...";
  }

  return strBase.slice(0, absoluteLength);
}
