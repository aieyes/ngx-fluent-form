export const isNumber = (o: unknown): o is number => typeof o === 'number';
export const isString = (o: unknown): o is string => typeof o === 'string';
export const isFunction = (o: unknown): o is Function => typeof o === 'function';
export const isBoolean = (o: unknown): o is boolean => typeof o === 'boolean';
export const isUndefined = (o: unknown): o is undefined => typeof o === 'undefined';
