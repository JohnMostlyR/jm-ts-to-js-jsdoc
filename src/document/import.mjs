import { log } from '../logger/logger.mjs';
import { hasLength, isDefined } from '../utils/typings.mjs';

import { Spaces, Strings } from '../common.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 */

/**
 * Document type imports
 *
 * @param {import('ts-morph').ImportDeclaration} importDeclaration
 * @returns {string} A JSDoc comment containing the typedef
 */
export function documentAnImportDeclaration(importDeclaration) {
  const thisFunctionNameTag = '[import.documentAnImportDeclaration()]';
  log.debug(`${thisFunctionNameTag} %s`, Strings.blockStart);

  /** @type {JSDocTagStructure[]} */
  const jsDocTagsToAdd = [];

  const importDeclarationDefaultImport = importDeclaration.getDefaultImport();
  const importDeclarationIsTypeOnly = importDeclaration.isTypeOnly();
  const importDeclarationModuleSpecifierValue =
    importDeclaration.getModuleSpecifierValue();

  /** @type {[name: string, type: string, identifier: string]} */
  let tagTextParts = [];

  /* default import */

  if (
    importDeclarationIsTypeOnly &&
    isDefined(importDeclarationDefaultImport)
  ) {
    const defaultImportIdentifier = importDeclarationDefaultImport?.getText();

    log.trace(
      `${thisFunctionNameTag} adding a JSDoc tag for a type-only import declaration with default import`
    );

    tagTextParts.push('@typedef');
    tagTextParts.push(`{import('${importDeclarationModuleSpecifierValue}')}`);

    if (isDefined(defaultImportIdentifier)) {
      tagTextParts.push(defaultImportIdentifier);
    }

    const tagText = tagTextParts.join(Spaces.oneSpace);
    tagTextParts = [];

    jsDocTagsToAdd.push(tagText);

    log.trace(
      `${thisFunctionNameTag} tag added: ${Strings.stringStart}%s${Strings.stringEnd}`,
      tagText
    );
  }

  /* named imports */

  const importDeclarationNamedImports = importDeclaration.getNamedImports();

  for (const namedImport of importDeclarationNamedImports) {
    const namedImportAliasNode = namedImport.getAliasNode();
    const namedImportName = namedImport.getName();
    const namedImportIsTypeOnly = namedImport.isTypeOnly();

    const alias = namedImportAliasNode?.getText() || namedImportName;

    if (importDeclarationIsTypeOnly || namedImportIsTypeOnly) {
      log.trace(
        `${thisFunctionNameTag} adding a JSDoc tag for an import declaration with a type-only named import`
      );

      tagTextParts.push('@typedef');
      tagTextParts.push(
        `{import('${importDeclarationModuleSpecifierValue}').${namedImportName}}`
      );
      tagTextParts.push(alias);

      const tagText = tagTextParts.join(Spaces.oneSpace);
      tagTextParts = [];

      jsDocTagsToAdd.push(tagText);

      log.trace(
        `${thisFunctionNameTag} tag added: ${Strings.stringStart}%s${Strings.stringEnd}`,
        tagText
      );
    }
  }

  /* output */

  let importDeclarationJsDoc = '';

  if (hasLength(jsDocTagsToAdd)) {
    const jsDocTags = jsDocTagsToAdd
      .map(
        (jsDocTagToAdd) =>
          `${Spaces.oneSpace}*${Spaces.oneSpace}${jsDocTagToAdd}`
      )
      .join('\n');
    importDeclarationJsDoc = `/**\n${jsDocTags}\n${Spaces.oneSpace}*/`;
  }

  log.debug(
    `${thisFunctionNameTag} import declaration JSDoc:\n%s`,
    importDeclarationJsDoc
  );

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);

  return importDeclarationJsDoc;
}
