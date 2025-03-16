export const stringIncludes = (base: string, query: string): boolean => {
    return base.toLowerCase().includes(query.toLowerCase());
};

export const formatRouteKey = (str: string, n = -5) => {
    return str
        .slice(0, n)
        .replace(/-/g, '_')
}