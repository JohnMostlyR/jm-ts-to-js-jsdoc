import { SyntaxKind, VariableDeclarationKind } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { hasLength, isDefined } from '../utils/typings.mjs';
import {
  addJsDoc,
  convertTypeStringToJSDocType,
  getJsDoc,
  sanitizeAStringForJsDoc,
  Strings,
} from '../common.mjs';
import { documentAFunction } from './function.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').VariableDeclaration} VariableDeclaration
 */

/**
 * Document top-level `const`, `let`, and `var` declarations.
 *
 * @param {VariableDeclaration} variableDeclaration
 */
function documentAVariable(variableDeclaration) {
  const thisFunctionNameTag = '[variable.documentAVariable()]';

  const variableStatement = variableDeclaration.getVariableStatement();
  const isConst =
    variableStatement?.getDeclarationKind() === VariableDeclarationKind.Const;
  const typeNode = variableDeclaration.getTypeNode();

  if (isConst && isDefined(typeNode) === false) {
    /*
     * The type of a `const` declaration is clear, so we don't need this to be
     * documented (but keep existing documentation).
     */
    log.trace(
      `${thisFunctionNameTag} variable is a 'const', no need to document. Skipping.`
    );

    return;
  }

  const existingJsDoc = getJsDoc(variableStatement);

  if (isDefined(existingJsDoc)) {
    const existingJsDocTags = existingJsDoc.getTags();

    if (existingJsDocTags.find((tag) => tag.getTagName() === 'type')) {
      log.trace(
        `${thisFunctionNameTag} 'type' is already documented. Skipping.`
      );

      return;
    }

    const constantsTagNames = new Set(['const', 'constant']);
    const constantsTagName = existingJsDocTags.find((tag) =>
      constantsTagNames.has(tag.getTagName())
    );

    if (
      isDefined(constantsTagName) &&
      hasLength(constantsTagName.getComment())
    ) {
      return;
    }
  }

  let jsDocCompatibleType = '';

  if (isConst && isDefined(typeNode)) {
    const typeNodeText = typeNode.getText();
    jsDocCompatibleType = convertTypeStringToJSDocType(
      sanitizeAStringForJsDoc(typeNodeText)
    );
  } else {
    const type = variableDeclaration.getType();
    const typeNodeText = (typeNode || type).getText();
    jsDocCompatibleType = convertTypeStringToJSDocType(
      sanitizeAStringForJsDoc(typeNodeText)
    );
  }

  const JsDocTagStructure = {
    tagName: 'type',
    text: `{${jsDocCompatibleType}}`,
  };

  log.debug(`${thisFunctionNameTag} adding JSDoc tag: %o`, JsDocTagStructure);

  if (isDefined(existingJsDoc)) {
    existingJsDoc.addTag(JsDocTagStructure);
  } else {
    const newJsDoc = addJsDoc(variableStatement);
    newJsDoc.addTag(JsDocTagStructure);
  }
}

/**
 * Document a variable
 *
 * @param {VariableDeclaration} variableDeclaration
 */
export function documentATopLevelVariable(variableDeclaration) {
  const thisFunctionNameTag = '[variable.documentATopLevelVariable()]';
  log.debug(`${thisFunctionNameTag} ${Strings.blockStart}`);

  const variableName = variableDeclaration.getName();

  log.debug(`${thisFunctionNameTag} Documenting variable: '${variableName}'`);

  log.trace(
    `${thisFunctionNameTag} variable is of kind: '%s'`,
    variableDeclaration.getKindName()
  );

  const functionLikeInitializer =
    variableDeclaration.getInitializerIfKind(SyntaxKind.FunctionExpression) ||
    variableDeclaration.getInitializerIfKind(SyntaxKind.ArrowFunction);

  if (isDefined(functionLikeInitializer)) {
    log.trace(
      `${thisFunctionNameTag} variable has a 'function like' initializer`
    );

    documentAFunction(
      functionLikeInitializer,
      variableDeclaration.getVariableStatement()
    );
  } else {
    documentAVariable(variableDeclaration);
  }

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);
}
