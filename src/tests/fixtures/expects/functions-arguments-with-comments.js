/*
 * Source file for testing that the program removes comments from type arguments.
 */

class MyClass {
    /**
     * @param {Map<*, *[]>} myMap
     */
    constructor(myMap) {
        /*  */
    }
}

/**
 * @param {Set<*>} mySet
 */
function myFunction(mySet) {
    /*  */
}
