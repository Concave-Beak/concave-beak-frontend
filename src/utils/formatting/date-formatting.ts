function padStart(value: number): string {
    const MAX_LENGTH = 2;
    return value.toString().padStart(MAX_LENGTH, '0');
}

export function dateFormatDMY(date: Date): string {
    return `${padStart(date.getDate())}/${padStart(date.getMonth() + 1)}/${date.getFullYear()}`;
}
