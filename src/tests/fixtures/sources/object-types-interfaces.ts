/*
 * Source file for testing that the program documents an interface
 */

interface Person {
  name: string;
  age: number;
  address?: {
    street: string;
    houseNumber: number;
    houseNumberAddition: string;
    postalcode: string;
    city: string;
  };
  authentication?: {
    id: string;

    /**
     * Called when the user wants to signin
     */
    signIn(): Promise<string>;
  };
}
