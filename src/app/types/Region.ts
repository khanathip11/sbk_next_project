export interface Region {
    value: string;
    label: string;
    provinces: {
        value: string;
        label: string;
    }[];
};