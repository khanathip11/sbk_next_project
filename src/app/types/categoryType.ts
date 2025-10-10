// src/types/category.ts

export interface SubCategory {
    id: string;
    category: string;
    createdAt?: string;
    creator?: string;
}

export interface Category {
    id: string;
    category: string;
    creator?: string;
    createdAt?: string;
    children?: SubCategory[];
}

export type CategoryList = Category[];
