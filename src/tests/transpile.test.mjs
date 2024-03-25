import { describe, expect, it } from '@jest/globals';

import { testing } from '../utils/index.mjs';

import transpile from '../transpile.mjs';

describe('transpile', function () {
  it('preserves blank lines', async function () {
    const { source, expected } = await testing.getFixture(
      'preserves-blank-lines'
    );

    const result = await transpile(source, {
      addTypeDocumentation: false,
    });

    expect(result.javascript).toBe(expected);
  });

  it('preserves type-only imports', async function () {
    const { source, expected } = await testing.getFixture(
      'preserves-type-only-imports'
    );

    const result = await transpile(source);

    expect(result.javascript).toBe(expected);
  });

  describe('imports', function () {
    describe('type-only', function () {
      describe('default import', function () {
        it('documents a type-only import declaration with a default import', async function () {
          const { source, expected } = await testing.getFixture(
            'imports-type-default-import'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });
      });

      describe('named imports', function () {
        it('documents a type-only import declaration with named imports', async function () {
          const { source, expected } = await testing.getFixture(
            'imports-type-named-import'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents a type-only import declaration with renamed, named imports', async function () {
          const { source, expected } = await testing.getFixture(
            'imports-type-named-import-with-alias'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents only the named type imports', async function () {
          const { source, expected } = await testing.getFixture(
            'imports-type-named-import-with-default'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents type imports when only referenced in a type position', async function () {
          const { source, expected } = await testing.getFixture(
            'imports-import-referenced-in-type-position'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });
      });
    });
  });

  describe('object types', function () {
    describe('interfaces', function () {
      it('documents an interface', async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-interfaces'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it("documents an interface's optional properties", async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-interface-optional-properties'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it("documents an interface's readonly properties", async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-interface-readonly-properties'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('documents a generic interface', async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-generic'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });
    });

    describe('type aliases', function () {
      it('documents a type alias', async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-type-alias'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('preserves property comments', async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-type-alias-property-comments'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('treats object literal union and intersection as regular aliases', async function () {
        const { source, expected } = await testing.getFixture(
          'object-types-type-alias-union-intersection'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });
    });

    it('documents an intersection type', async function () {
      const { source, expected } = await testing.getFixture(
        'object-types-intersection'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('removes any comments from a type alias (this becomes problematic when transpiled to JSDoc)', async function () {
      const { source, expected } = await testing.getFixture(
        'object-types-with-comments'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('removes any comments from object properties (this becomes problematic when transpiled to JSDoc)', async function () {
      const { source, expected } = await testing.getFixture(
        'object-properties-with-comments'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });
  });

  describe('functions', function () {
    it('documents a function declaration', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-declaration'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents an optional parameter', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-optional-parameter'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it("documents a parameter's default value", async function () {
      const { source, expected } = await testing.getFixture(
        'functions-parameter-default-value'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents rest parameters', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-rest-parameters'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents an inferred return type', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-inferred-return-type'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents a generic function', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-generic-function'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('references the return type', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-return-type-reference'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents a generator function', async function () {
      const { source, expected } = await testing.getFixture(
        'functions-generator-functions'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    describe('handling of existing JSDoc', function () {
      it('updates the nearest JSDoc', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-update-nearest-jsdoc'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      // I think I won't bother
      it.skip("does not modify a tag's name", async function () {
        const { source, expected } = await testing.getFixture(
          'functions-preserve-tag-name'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it("does not modify the optional dash between a tag's name and description", async function () {
        const { source, expected } = await testing.getFixture(
          'functions-preserve-param-description-dash'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('corrects the order of existing tags', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-correct-order'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('corrects the type for an existing `@param` tag', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-corrects-param-type'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('corrects the type for an existing `@returns` tag', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-corrects-return-type'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('removes tags for non-existing parameters', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-remove-non-existing-params'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('removes optional parameter indicators for a parameter that is not optional', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-remove-incorrect-optional-parameter'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('removes comments from type arguments', async function () {
        const { source, expected } = await testing.getFixture(
          'functions-arguments-with-comments'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });
    });
  });

  describe('variable declarations', function () {
    it('documents the correct type for "let" and "var" declarations', async function () {
      const { source, expected } = await testing.getFixture(
        'variables-declarations-var-and-let'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('should only add type documentation to "const" declarations when specified', async function () {
      const { source, expected } = await testing.getFixture(
        'variables-declarations-const'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents variables containing a function expression', async function () {
      const { source, expected } = await testing.getFixture(
        'variables-function-expression'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents variables containing an arrow function expression', async function () {
      const { source, expected } = await testing.getFixture(
        'variables-arrow-function-expression'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });
  });

  describe('classes', function () {
    it('documents a generic class', async function () {
      const { source, expected } = await testing.getFixture(
        'classes-generic-class'
      );

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    it('documents a class that implements an interface', async function () {
      const { source, expected } =
        await testing.getFixture('classes-implements');

      const result = await transpile(source);

      expect(result.javascript).toBe(expected);
    });

    describe('class members', function () {
      describe('property modifier', function () {
        it('documents a readonly member', async function () {
          const { source, expected } = await testing.getFixture(
            'classes-with-readonly-members'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents a public member', async function () {
          const { source, expected } = await testing.getFixture(
            'classes-with-public-members'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents a protected member', async function () {
          const { source, expected } = await testing.getFixture(
            'classes-with-protected-members'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents a private member', async function () {
          const { source, expected } = await testing.getFixture(
            'classes-with-private-members'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });

        it('documents a static member', async function () {
          const { source, expected } = await testing.getFixture(
            'classes-with-static-members'
          );

          const result = await transpile(source);

          expect(result.javascript).toBe(expected);
        });
      });

      it("documents a class's constructor", async function () {
        const { source, expected } = await testing.getFixture(
          'classes-with-constructor'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it("documents a class's methods", async function () {
        const { source, expected } = await testing.getFixture(
          'classes-with-methods'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('documents fields that have initializers', async function () {
        const { source, expected } = await testing.getFixture(
          'classes-with-fields-with-initializers'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });

      it('should NOT document fields that have initializers where the type is inferred', async function () {
        const { source, expected } = await testing.getFixture(
          'classes-with-fields-with-initializers-inferred-type'
        );

        const result = await transpile(source);

        expect(result.javascript).toBe(expected);
      });
    });
  });

  describe('JSX support', function () {
    it('should support JSX', async function () {
      const { source, expected } = await testing.getFixture(
        'jsx-support',
        true
      );

      const result = await transpile(source, true);

      expect(result.javascript).toBe(expected);
    });
  });
});
