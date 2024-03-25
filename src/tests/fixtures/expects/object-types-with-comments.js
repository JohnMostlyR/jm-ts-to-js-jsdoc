/*
 * Source file for testing that the program removes any comments from types.
 */

/**
 * @template T
 * @template TargetFunctionsReturnType
 * @template FirstParameter
 * @typedef {T extends (...args: any[]) => TargetFunctionsReturnType ? (firstArg: FirstParameter, ...args: Parameters<T>) => ReturnType<T> : T} AddFirstParameterToFunction
 */
