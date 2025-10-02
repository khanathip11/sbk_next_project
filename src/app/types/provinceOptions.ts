// src/data/locations.ts

export type Subdistrict = {
    value: string;
    label: string;
};

export type District = {
    value: string;
    label: string;
    subdistricts: Subdistrict[];
};

export type Province = {
    value: string;
    label: string;
    districts: District[];
};
