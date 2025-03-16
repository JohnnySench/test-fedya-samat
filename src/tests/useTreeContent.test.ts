import { it, expect } from 'vitest';
import { createTree, findPath, filterTree } from '@/composables/useTreeContent/utils';
import type { IPages } from '@/shared/types';

it('createTree test', () => {
    const pages: IPages = {
        a: { key: 'a', level: 0, link: 'a.html', name: 'a', childPageKeys: ['d', 'e'] },
        b: { key: 'b', level: 0, link: 'b.html', name: 'b', childPageKeys: ['c'] },
        c: { key: 'c', level: 1, link: 'c.html', name: 'c', parentKey: 'b', childPageKeys: ['s'] },
        d: { key: 'd', level: 1, link: 'd.html', name: 'd', parentKey: 'a' },
        e: { key: 'e', level: 1, link: 'e.html', name: 'e', parentKey: 'a' },
        s: { key: 's', level: 2, link: 's.html', name: 's', parentKey: 'c' },
    };

    const expectedTreePages = [
        {
            key: 'a',
            level: 0,
            link: 'a.html',
            name: 'a',
            childPageKeys: [
                {
                    key: 'd',
                    level: 1,
                    link: 'd.html',
                    name: 'd',
                    parentKey: 'a',
                    childPageKeys: [],
                },
                {
                    key: 'e',
                    level: 1,
                    link: 'e.html',
                    name: 'e',
                    parentKey: 'a',
                    childPageKeys: [],
                },
            ],
        },
        {
            key: 'b',
            level: 0,
            link: 'b.html',
            name: 'b',
            childPageKeys: [
                {
                    key: 'c',
                    level: 1,
                    link: 'c.html',
                    name: 'c',
                    parentKey: 'b',
                    childPageKeys: [
                        {
                            key: 's',
                            level: 2,
                            link: 's.html',
                            name: 's',
                            parentKey: 'c',
                            childPageKeys: [],
                        },
                    ],
                },
            ],
        },
    ];
    const rootPaths = ['a', 'b']

    const result = createTree(pages, rootPaths);

    expect(result).toEqual(expectedTreePages);
});

it('findPath test', () => {
    const treePaths = [
        {
            key: 'a',
            level: 0,
            link: 'a.html',
            name: 'a',
            childPageKeys: [
                {
                    key: 'd',
                    level: 1,
                    link: 'd.html',
                    name: 'd',
                    parentKey: 'a',
                    childPageKeys: [],
                },
                {
                    key: 'e',
                    level: 1,
                    link: 'e.html',
                    name: 'e',
                    parentKey: 'a',
                    childPageKeys: [],
                },
            ],
        },
        {
            key: 'b',
            level: 0,
            link: 'b.html',
            name: 'b',
            childPageKeys: [
                {
                    key: 'c',
                    level: 1,
                    link: 'c.html',
                    name: 'c',
                    parentKey: 'b',
                    childPageKeys: [
                        {
                            key: 's',
                            level: 2,
                            link: 's.html',
                            name: 's',
                            parentKey: 'c',
                            childPageKeys: [],
                        },
                    ],
                },
            ],
        },
    ];
    const routeName1 = 's'
    const resolvePathsForRouteName1 = ['b', 'c', 's']
    const result1 = findPath(treePaths, routeName1)

    const routeName2 = 'd'
    const resolvePathsForRouteName2 = ['a', 'd']
    const result2 = findPath(treePaths, routeName2)

    expect(result1).toEqual(resolvePathsForRouteName1)
    expect(result2).toEqual(resolvePathsForRouteName2)
})

it('filterTree', () => {
    const treePaths = [
        {
            key: 'a',
            level: 0,
            link: 'a.html',
            name: 'a',
            childPageKeys: [
                {
                    key: 'd',
                    level: 1,
                    link: 'd.html',
                    name: 'd',
                    parentKey: 'a',
                    childPageKeys: [],
                },
                {
                    key: 'e',
                    level: 1,
                    link: 'e.html',
                    name: 'e',
                    parentKey: 'a',
                    childPageKeys: [],
                },
            ],
        },
        {
            key: 'b',
            level: 0,
            link: 'b.html',
            name: 'b',
            childPageKeys: [
                {
                    key: 'c',
                    level: 1,
                    link: 'c.html',
                    name: 'c',
                    parentKey: 'b',
                    childPageKeys: [
                        {
                            key: 's',
                            level: 2,
                            link: 's.html',
                            name: 's',
                            parentKey: 'c',
                            childPageKeys: [],
                        },
                    ],
                },
            ],
        },
    ];

    const expectedTreePages = [
        {
            key: 'b',
            level: 0,
            link: 'b.html',
            name: 'b',
            childPageKeys: [
                {
                    key: 'c',
                    level: 1,
                    link: 'c.html',
                    name: 'c',
                    parentKey: 'b',
                    childPageKeys: [
                        {
                            key: 's',
                            level: 2,
                            link: 's.html',
                            name: 's',
                            parentKey: 'c',
                            childPageKeys: [],
                        },
                    ],
                },
            ],
        },
    ]

    const result = filterTree(treePaths, 'c')
    expect(result).toEqual(expectedTreePages)
})
