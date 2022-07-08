export const allAreEqual = (array: Array<any>) => {
    const result: boolean = array.every(element => {
        if (element === array[0]) {
            return true;
        }
    });

    return result;
}