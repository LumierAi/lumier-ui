export type LumierOmitUnion<T, U extends  T> = T extends U ? never : T;

declare global {
  export namespace LumierTypes {
    /**
     * Type that omits a type from a union.
     *
     * @template T - A type.
     * @template U - A union type.
     * @returns {T | never} - Returns T if it is not a part of the union U, otherwise it returns never.
     */
    export type OmitUnion<T, U extends  T> = T extends U ? never : T;

    /**
     * Type that picks a type from a union.
     *
     * @template T - A type.
     * @template U - A union type.
     * @example. type a = 'a' | 'b' | 'c'; type b = PickUnion<a, 'a'>; // b = 'a'
     */
    export type PickUnion<T, U> = T extends U ? T : never;

    /**
     * Type that makes some properties of a given type optional.
     *
     * @template T - The original type.
     * @template TKey - The keys of the properties to be made optional.
     *
     * @typedef OptionalProperties
     *
     * @type {Omit<T, TKey> & Partial<Pick<T, TKey>>}
     *
     * @description This type uses TypeScript's Omit and Partial utility types to make some properties of a given type optional. It first omits the properties to be made optional from the original type and then picks those properties and makes them optional.
     */
    export type OptionalProperties<T, TKey extends keyof T> = Omit<T, TKey> & Partial<Pick<T, TKey>>

    /**
     * Represents a keyed item.
     *
     * @template Key - A string that represents the key.
     * @template Label - A string that represents the label.
     *
     * @typedef KeyedItem
     *
     * @type {Object}
     *
     * @property {[P in Key]: any} - A computed property that represents the key.
     * @property {[Q in Label]: any} - A computed property that represents the label.
     * @property {[key: string]: any} - A computed property that represents any additional properties.
     *
     * @example
     * // Define a KeyedItem
     * type MyItem = KeyedItem<'id', 'name'>;
     *
     * // Create an object that matches the MyItem type
     * const item: MyItem = {
     *   id: 1,
     *   name: 'Item Name',
     *   description: 'This is an item',
     * };
     */
    export type KeyedItem<Key extends string, Label extends string> = {
      [P in Key]: any;
    } & {
      [Q in Label]: any;
    } & {
      [key: string]: any;
    };


    /**
     * Type that checks if a value is not an array of strings.
     *
     * @template T - A type.
     * @returns {T | never} - Returns T if it is not an array of strings, otherwise it returns never.
     */
    export type NotStringArray<T> = T extends string[] ? never : T

    /**
     * Type that checks if a value is not undefined.
     *
     * @template T - A type.
     * @returns {T | never} - Returns T if it is not undefined, otherwise it returns never.
     */
    export type NotUndefined<T> = T extends undefined ? never : T;

    export type NotNull<T> = T extends null ? never : T;

    /**
     * Type that omits properties of a given object type that are undefined.
     *
     * @template T - The original object type.
     *
     * @typedef OmitUndefined
     *
     * @type {Object}
     *
     * @property {[K in keyof T]: T[K] extends undefined ? never : T[K]} - An object type where each property is either the original type or never if the original type was undefined.
     *
     * @example
     * // Define an object type
     * type MyObject = {
     *   prop1: string | undefined;
     *   prop2: number;
     * };
     *
     * // Use OmitUndefined
     * type MyOmittedObject = OmitUndefined<MyObject>;
     *
     * // MyOmittedObject is now { prop2: number; }, prop1 is omitted because it can be undefined
     */
    export type OmitUndefined<T extends object> = {
      [K in keyof T]: T[K] extends undefined ? never : T[K];
    }


    /**
     * OptionalUndefined - Converts properties that are possibly undefined to optional.
     *
     * @template T - The type to be transformed.
     * @typedef {Object} OptionalUndefined
     * @property {Partial<Pick<T, {[K in keyof T as undefined extends T[K] ? K : never]: T[K] }[keyof T]>>} [Properties that are optional]
     * @property {Pick<T, {[K in keyof T as undefined extends T[K] ? never : K]: T[K] }[keyof T]>} [Properties that are not optional]
     *
     * @example
     * type Example = {
     *   requiredProp: string;
     *   optionalProp?: number;
     *   undefinedProp: string | undefined;
     * };
     *
     * // Resulting type:
     * // {
     * //   requiredProp: string;
     * //   optionalProp?: number;
     * //   undefinedProp?: string | undefined;
     * // }
     *
     * type TransformedExample = OptionalUndefined<Example>;
     */
    export type OptionalUndefined<T> = {
      [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
    } & {
      [K in keyof T as undefined extends T[K] ? never : K]: T[K];
    };


    /**
     * NullableDeep - Makes all properties of a type and its subtypes nullable.
     *
     * @template T - The type to be transformed.
     * @typedef {Object} NullableDeep
     * @property {T[K] | null} Properties - Properties that can be null.
     * @property {NullableDeep<T[K]> | null} [Nested properties] - Nested properties that can be null.
     *
     * @example
     * type Example = {
     *   prop1: string;
     *   nested: {
     *     prop2: number;
     *   };
     * };
     *
     * // Resulting type:
     * // {
     * //   prop1: string | null;
     * //   nested: {
     * //     prop2: number | null;
     * //   } | null;
     * // }
     *
     * type TransformedExample = NullableDeep<Example>;
     */
    export type NullableDeep<T> = {
      [K in keyof T]: T[K] extends object ? NullableDeep<T[K]> : T[K] | null;
    }
  }
}
