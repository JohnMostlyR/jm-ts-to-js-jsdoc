/*
 * Source file for testing that the program removes any comments from types.
 */

type AddFirstParameterToFunction<T, TargetFunctionsReturnType, FirstParameter> =
  T extends (...args: any[]) => TargetFunctionsReturnType
    ? // Function: add param to function
      (firstArg: FirstParameter, ...args: Parameters<T>) => ReturnType<T>
    : // Else: just leave as is
      T;
