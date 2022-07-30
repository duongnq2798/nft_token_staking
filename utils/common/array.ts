/**
 * It takes an array of objects and adds a new attribute to each object in the array.
 * @param attrs - {} -&gt; this is the object that you want to add to each element of the array.
 * @param {any[]} arr - [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}]
 */
export const addNewAttributeForEachElement = (attrs: {}, arr: any[] = []) => {
    if (arr && arr.length) {
        for (let i = 0; i < arr.length; i++) {
            let newObject = { ...arr[i], ...attrs }
            arr[i] = newObject
        }
    }

    return arr;
}
