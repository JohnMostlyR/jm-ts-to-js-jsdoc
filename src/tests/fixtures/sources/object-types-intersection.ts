/*
 * Source file for testing that the program documents intersection types
 */

interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

type ColorfulCircle = Colorful & Circle;
