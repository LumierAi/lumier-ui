/**
 * Randomly sorts an array of strings.
 *
 * @param {string[]} arr - The array to be sorted.
 * @returns {string[]} A new array with the same elements in a random order.
 *
 * @example
 * const originalArray = ['a', 'b', 'c', 'd'];
 * const randomizedArray = randomSort(originalArray);
 * console.log(randomizedArray); // Possible output: ['c', 'a', 'd', 'b']
 */
export function randomSort(arr: string[]): string[] {
  return arr.sort(() => Math.random() - 0.5)
}

/**
 * Creates a promise that resolves after a specified duration.
 *
 * @param {number} duration - The duration to wait in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 *
 * @example
 * await wait(1000); // Waits for 1 second before continuing execution
 */
export function wait(duration: number) {
  return new Promise<void>(resolve => setTimeout(() => {
    resolve()
  }, duration))
}

/**
 * Returns an array of keys from an object, typed as the object's keys.
 *
 * @template T
 * @param {T} obj - The object to extract keys from.
 * @returns {(keyof T)[]} An array of the object's keys, typed as keyof T.
 *
 * @example
 * const myObj = { a: 1, b: 'string', c: true };
 * const objKeys = keys(myObj);
 * console.log(objKeys); // ['a', 'b', 'c']
 */
export const keys = <T extends Record<string, unknown>>(obj: T) => Object.keys(obj) as (keyof T)[]

export function domainNameFromUrl(url: string): string {
  try {
    // Remove the protocol
    let domain = url.replace(/(^\w+:|^)\/\//, '')

    // Remove www if present
    domain = domain.replace(/^www\./, '')

    // Remove subdomains and TLD
    domain = domain.split('.')[0] as string

    return domain
  }
  catch (error) {
    return url
  }
}
