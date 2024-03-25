/*
 * Source file for testing that the program documents a class's static members.
 */

class MyClass {
    static x = 0;
    static printX() {
        console.log(MyClass.x);
    }
}

class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch { }
    }
}
