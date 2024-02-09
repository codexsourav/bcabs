export function splitArray<T>(arr: T[]) {
    const middleIndex = Math.floor(arr.length / 2);
    const part1 = arr.slice(0, middleIndex);
    const part2 = arr.slice(middleIndex);
    return [part1, part2];
}

export const scrollToElement = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const setPageTitle = (title: string): void => {
    document.title = title;
}