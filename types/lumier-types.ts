export type LumierOmitUnionB<T, U extends  T> = T extends U ? never : T;
