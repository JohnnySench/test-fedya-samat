import type { IPages, TPage, TRecursivePage, TRootPages } from '@/shared/types'
import { stringIncludes } from "@/shared/helper";

export const createTree = (pages: IPages, rootPaths: TRootPages) => {
    const buildTree = (page: TPage) => ({
        ...page,
        childPageKeys: (page.childPageKeys || []).reduce((acc, key) => {
            const child = pages[key] as TPage;
            if (child) acc.push(buildTree(child));
            return acc;
        }, [] as TRecursivePage[]),
    });

    return rootPaths.reduce((acc, page) => {
        acc.push(buildTree(pages[page]));
        return acc;
    }, [] as TRecursivePage[]);
};

export const filterTree = (tree: TRecursivePage[], query: string): TRecursivePage[] => {
    if (!query) return tree;

    return tree.reduce((acc, node) => {
        if (stringIncludes(node.name, query)) {
            acc.push(node);
        } else if (node.childPageKeys) {
            const filteredChildren = filterTree(node.childPageKeys, query);
            if (filteredChildren.length) {
                acc.push({ ...node, childPageKeys: filteredChildren });
            }
        }
        return acc;
    }, [] as TRecursivePage[]);
};

export const findPath = (structure: TRecursivePage[], targetKey: string): string[] | null => {
    const searchPage = (pages: TRecursivePage[], targetKey: string, path: string[]): string[] | null => {
        for (let page of pages) {
            const currentPath = [...path, page.key];
            if (page.key === targetKey) {
                return currentPath;
            }

            if (page.childPageKeys) {
                const result = searchPage(page.childPageKeys, targetKey, currentPath);
                if (result) {
                    return result;
                }
            }
        }
        return null;
    }

    return searchPage(structure, targetKey, []);
}