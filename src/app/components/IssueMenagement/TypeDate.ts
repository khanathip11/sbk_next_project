// src/components/IssueTable/types.ts
export interface DateRow {
    [key: string]: string | number | null | undefined;
}

export interface Column {
    label: string;
    minWidth?: number;
    align?: "left" | "center" | "right";
    format?: (value: number) => string;
}
