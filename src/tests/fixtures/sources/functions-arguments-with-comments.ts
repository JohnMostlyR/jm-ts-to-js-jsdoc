/*
 * Source file for testing that the program removes comments from type arguments.
 */

class MyClass {
  constructor(myMap: Map<any /* TODO: remove this */, any[]>) {
    /*  */
  }
}

function myFunction(mySet: Set<any /* TODO: remove this */>) {
  /*  */
}
