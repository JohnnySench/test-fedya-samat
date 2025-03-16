export type TPage = {
    key: string;
    level: number;
    link: string;
    name: string;
    parentKey?: string;
    childPageKeys?: string[]
}

export interface IPages {
    [key: string]: TPage;
}

export type TRootPages = (keyof IPages)[]

export type TRecursivePage = {
    key: string;
    level: number;
    link: string;
    name: string;
    parentKey?: string;
    childPageKeys?: TRecursivePage[] | null
}