/*
 * Source file for testing that the program correctly documents a generic function declaration.
 */

function aFunction<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
