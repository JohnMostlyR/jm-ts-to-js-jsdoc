/**
 * @module transpile
 * @description Transpiles TypeScript to JavaScript. Type annotations are
 * documented as JSDoc comments, wherever possible. Blank lines are preserved.
 * @summary Transpiles TypeScript to JavaScript with JSDoc comments.
 * @copyright Copyright (c) Johan Meester
 * @license MIT
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { pid } from 'node:process';

import {
  IndentationText,
  NewLineKind,
  Project,
  QuoteKind,
  ScriptTarget,
} from 'ts-morph';

import { log } from './logger/logger.mjs';
import { hasLength, isString } from './utils/typings.mjs';

import { NewLine, Strings } from './common.mjs';
import { documentAClass } from './document/class.mjs';
import { documentAFunction } from './document/function.mjs';
import { documentAnImportDeclaration } from './document/import.mjs';
import { documentAnInterface, documentATypeAlias } from './document/type.mjs';
import { documentATopLevelVariable } from './document/variable.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').ManipulationError} ManipulationError
 * @typedef {import('ts-morph').ManipulationSettings} ManipulationSettings
 * @typedef {import('ts-morph').ProjectOptions} ProjectOptions
 * @typedef {import('typescript').CompilerOptions} CompilerOptions
 */

/**
 * @async
 * @param {string} typescript
 * @param {boolean} [isJSX=false]
 * @param {import('./types.mjs').TranspileOptions} [options={ addTypeDocumentation: true }] Options
 * 		See https://www.typescriptlang.org/tsconfig#compilerOptions
 * @returns {Promise<{ javascript: string | undefined, error: { oldText: string, newText: string} | undefined }>} The transpiled source code
 */
async function transpile(
  typescript,
  isJSX = false,
  options = { addTypeDocumentation: true }
) {
  const { addTypeDocumentation = true, tsConfigFilePath } = options;

  /*
   * For simplicity, we will use Linux style line endings, `\n`, but we should not
   * change the original line endings style.
   */
  const useWindowsStyleLineEndings = /\r\n/.test(typescript);

  /*
   * A marker to replace blank lines with. (ts-morph parses out blank lines)
   */
  const blankLineMarker = `// __${pid}_BLANK_LINE_MARKER__ //`;

  const sourceFileText = typescript
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => {
      /*
       * [🙈 HACK 🙈]
       * Removing leading multiline comments as these are problematic when inserting
       * JSDoc (The JSDoc is inserted after the comment, this is an error).
       */
      const _line = line.replace(
        /\/\*(?:[^(?:*/)]*)\*\/[\s|\t]*(\S.+)/gms,
        '$1'
      );

      /*
       * Replacing an empty line with a marker
       */
      return /^[\s\t]*$/.test(_line) ? `${blankLineMarker}${_line}` : _line;
    })
    .join('\n');

  /**
   * @type {CompilerOptions}
   */
  const programDefaultCompilerOptions = {
    esModuleInterop: true,
    target: ScriptTarget.ESNext,
    experimentalDecorators: true,
    isolatedModules: true,
    jsx: 'preserve',
    noEmitHelpers: true,
  };

  /**
   * Options that should never be overridden
   *
   * @type {CompilerOptions}
   */
  const programRequiredCompilerOptions = {
    verbatimModuleSyntax: true,
  };

  /**
   * @type {CompilerOptions}
   */
  const combinedCompilerOptions = {
    ...programDefaultCompilerOptions,
    ...programRequiredCompilerOptions,
  };

  /**
   * @type {ManipulationSettings}
   */
  const manipulationSettings = {
    indentationText: IndentationText.TwoSpaces,
    insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
    newLineKind: useWindowsStyleLineEndings
      ? NewLineKind.CarriageReturnLineFeed
      : NewLineKind.LineFeed,
    quoteKind: QuoteKind.Single,
    usePrefixAndSuffixTextForRename: false,
    useTrailingCommas: true,
  };

  /**
   * @type {ProjectOptions}
   */
  const projectOptions = {
    compilerOptions: combinedCompilerOptions,
    tsConfigFilePath,
    manipulationSettings,
  };

  log.debug('[transpile.transpile()] Project options:\n%o', projectOptions);

  try {
    const project = new Project(projectOptions);
    const sourceFileExtension = isJSX ? 'tsx' : 'ts';
    const sourceFileName = `${pid}.${sourceFileExtension}`;
    const sourceFile = project.createSourceFile(
      sourceFileName,
      sourceFileText,
      {
        overwrite: true,
      }
    );

    //#region Include JSDoc comments -------------------------------------------

    let insertTypesMarker = Strings.emptyString;

    /**
     * Will hold JSDoc for interfaces and type aliases
     *
     * @type {string[]}
     */
    let objectTypes = [];

    if (addTypeDocumentation === true) {
      /*
       * [🙈 HACK 🙈]
       * We want type documentation right after all import declarations.
       * For this we use a dummy import declaration that we can replace.
       */
      const dummyImportDeclaration = sourceFile.addImportDeclaration({
        defaultImport: `InsertTypesMarker${pid}`,
        moduleSpecifier: `./REMOVE/ME/${pid}`,
      });

      insertTypesMarker = dummyImportDeclaration.getText();

      /*
       * [🙈 HACK 🙈]
       * Types, like Interfaces and Object Types, are pure documentation
       * and will be removed by the transpiler.
       * We will keep these aside and insert them again later.
       */

      /* Import Declarations */
      const importDeclarations = sourceFile
        .getImportDeclarations()
        .filter(
          (importDeclaration) => importDeclaration !== dummyImportDeclaration
        )
        .map((importDeclaration) =>
          documentAnImportDeclaration(importDeclaration).trim()
        );

      objectTypes = [...objectTypes, ...importDeclarations];

      /* Interfaces */
      const interfaces = sourceFile
        .getInterfaces()
        .map((interfaceDeclaration) =>
          documentAnInterface(interfaceDeclaration).trim()
        );

      objectTypes = [...objectTypes, ...interfaces];

      /* Type Aliases */
      const typeAliases = sourceFile
        .getTypeAliases()
        .map((typeAliasDeclaration) =>
          documentATypeAlias(typeAliasDeclaration).trim()
        );

      objectTypes = [...objectTypes, ...typeAliases];

      /* Variable Declarations */
      sourceFile
        .getVariableDeclarations()
        .forEach((variableDeclaration) =>
          documentATopLevelVariable(variableDeclaration)
        );

      /* Functions */
      sourceFile
        .getFunctions()
        .forEach((functionDeclaration) =>
          documentAFunction(functionDeclaration)
        );

      /* Classes */
      sourceFile
        .getClasses()
        .forEach((classDeclaration) => documentAClass(classDeclaration));
    }

    //#endregion Include JSDoc comments

    const emittedResult = project.emitToMemory({
      customTransformers: {
        // optional transformers to evaluate before built in .js transformations
        before: [],

        // optional transformers to evaluate after built in .js transformations
        after: [],
      },
    });

    const emittedSourceFileText = emittedResult.getFiles()?.[0]?.text;

    if (
      isString(emittedSourceFileText) === false ||
      hasLength(emittedSourceFileText) === false
    ) {
      throw new Error('[transpile.transpile()] No output after transformation');
    }

    const javascript = emittedSourceFileText
      .replace(insertTypesMarker, () => {
        let replaceWith = Strings.emptyString;

        if (hasLength(objectTypes)) {
          replaceWith = `${NewLine.newLine}${objectTypes.join(NewLine.twoNewLines)}`;
        }

        return replaceWith;
      })
      .split(`${NewLine.newLine}`)
      .map((_line) => {
        const line = _line.trim();
        return line.startsWith(blankLineMarker)
          ? line.slice(blankLineMarker.length)
          : _line;
      })
      .join(NewLine.newLine)
      .replace(/^\n{2,}/m, NewLine.newLine)
      .trim();

    const javascriptOut = useWindowsStyleLineEndings
      ? `${javascript.replace(/\n/g, '\r\n')}\r\n`
      : `${javascript}\n`;

    return { javascript: javascriptOut, error: undefined };
  } catch (/** @type {ManipulationError} */ error) {
    log.error('[transpile.transpile()] an error occurred: ', error);
    return {
      javascript: undefined,
      error: { oldText: error.oldText, newText: error.newText },
    };
  }
}

export default transpile;
