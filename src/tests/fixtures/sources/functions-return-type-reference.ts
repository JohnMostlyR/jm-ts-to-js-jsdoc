/*
 * Source file for testing that the program references the return type.
 */

export interface AType {
  aKey: string;
}

export function aFunction(p: string): AType {
  return { aKey: p };
}
