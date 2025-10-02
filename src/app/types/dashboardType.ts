export type Column = {
    id: string;
    label: string;
    minWidth: number;
    align?: "right" | "left" | "center";
};

export type DateRow = {
    [key: string]: string | number;
}