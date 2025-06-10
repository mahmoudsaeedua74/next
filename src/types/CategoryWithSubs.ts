// types/index.ts

export type MainCategory = {
    name: string;
    categories: string[];
    cover: string;
    id:number
};

export type SubCategory = {
    id: number;
    name: string;
    main_category_id: number;
};

export type CategoryWithSubs = {
    id: number;
    name: string;
    icon?: string;
    subCategories: SubCategory[];
};
export type Country = {
    code: string;
};

