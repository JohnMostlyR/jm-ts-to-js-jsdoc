/*
 * Source file for testing that the program documents a type alias and preserves
 * the original property comments.
 */

type Person = {
  name: string;

  /**
   * Comment
   * @deprecated
   */
  age: number;
};
