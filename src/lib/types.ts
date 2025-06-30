export type FileCollection = { [path: string]: string };

export type TreeItem = string | [string, ...TreeItem[]];

export const SANDBOX_TIMEOUT = 60_000 * 10; // 10 minutes