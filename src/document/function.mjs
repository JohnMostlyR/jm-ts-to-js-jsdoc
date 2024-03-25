import { Node, StructureKind, ts } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { hasLength, isDefined, isString } from '../utils/typings.mjs';
import {
  addJsDoc,
  convertTypeStringToJSDocType,
  getJsDoc,
  handleExistingJsDoc,
  sanitizeAStringForJsDoc,
  Spaces,
  Strings,
} from '../common.mjs';
import { documentATypeParameter } from './type-parameter.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').FunctionLikeDeclaration} FunctionLikeDeclaration
 * @typedef {import('ts-morph').JSDoc} JSDoc
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 * @typedef {import('ts-morph').VariableStatement} VariableStatement
 */

/**
 * @typedef {[type: string, name: string, description?: string]} JSDocPropertyAndParameterTagTextParts
 * @typedef {[type: string, description?: string]} JSDocReturnTagTextParts
 */

/**
 * @param {import('ts-morph').ParameterDeclaration} parameter
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 * @param {Map<string, string>} parameterCommentLookup
 */
function documentAParameter(parameter, jsDocTagsToAdd, parameterCommentLookup) {
  const thisFunctionNameTag = '[function.documentAParameter()]';

  const parameterStructure = parameter.getStructure();

  log.trace(
    `${thisFunctionNameTag} parameter structure: %o`,
    parameterStructure
  );

  const {
    initializer: parameterInitializer,
    isRestParameter: parameterIsRestParameter = false,
    name: parameterName,
    type: parameterType,
  } = parameterStructure;

  /* name */
  log.debug(`${thisFunctionNameTag} documenting parameter '${parameterName}'`);

  /* type */
  if (isString(parameterType) === false) {
    return;
  }

  const parameterTypeNodeText = convertTypeStringToJSDocType(
    sanitizeAStringForJsDoc(parameterType)
  );

  /*
   * For rest parameters, replace `<type>[]` with the JSDoc correct syntax, `...<type>`
   */
  const jsDocParameterType = parameterIsRestParameter
    ? `...${parameterTypeNodeText.replace(/\[\]\s*$/, Strings.emptyString)}`
    : parameterTypeNodeText;

  log.trace(
    `${thisFunctionNameTag} JSDoc type: ${Strings.stringStart}%s${Strings.stringEnd}`,
    jsDocParameterType
  );

  /**
   * @type {JSDocPropertyAndParameterTagTextParts}
   */
  const tagTextParts = [];

  tagTextParts.push(`{${jsDocParameterType}}`);

  /*
   * Do not use an object literal for a parameter's identifier
   */
  let jsDocParameterIdentifier = /[{},]/.test(parameterName)
    ? Strings.emptyString
    : parameterName;

  /* is optional */
  const isOptional = parameter.isOptional();
  log.trace(`${thisFunctionNameTag} parameter is optional '%s'`, isOptional);

  if (isOptional && hasLength(jsDocParameterIdentifier)) {
    const jsDocDefaultValue =
      isString(parameterInitializer) && hasLength(parameterInitializer)
        ? `=${parameterInitializer}`
        : Strings.emptyString;

    jsDocParameterIdentifier = `[${jsDocParameterIdentifier}${jsDocDefaultValue}]`;
  }

  log.trace(
    `${thisFunctionNameTag} JSDoc parameter identifier: ${Strings.stringStart}%s${Strings.stringEnd}`,
    jsDocParameterIdentifier
  );

  tagTextParts.push(jsDocParameterIdentifier);

  const comment = parameterCommentLookup.get(parameterName);

  log.trace(`${thisFunctionNameTag} comment: %s`, comment);

  if (hasLength(comment)) {
    tagTextParts.push(comment);
  }

  const tagText = tagTextParts.join(`${Spaces.oneSpace}`);

  log.debug(
    `${thisFunctionNameTag} JSDoc parameter tag text: ${Strings.stringStart}%s${Strings.stringEnd}`,
    tagText
  );

  jsDocTagsToAdd.push({
    kind: StructureKind.JSDocTag,
    tagName: 'param',
    text: tagText,
  });
}

/**
 * @param {import('ts-morph').TypeNode<ts.TypeNode> | import('ts-morph').Type<ts.Type>} returnType
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 * @param {Map<string | undefined, string>} returnTypeCommentLookup
 */
function documentAReturnType(
  returnType,
  jsDocTagsToAdd,
  returnTypeCommentLookup
) {
  const thisFunctionNameTag = '[function.documentAReturnType()]';

  const returnTypeText = returnType.getText();

  log.trace(
    `${thisFunctionNameTag} return type (as text): ${Strings.stringStart}%s${Strings.stringEnd}`,
    returnTypeText
  );

  const returnTypeJsDocText = convertTypeStringToJSDocType(
    sanitizeAStringForJsDoc(returnTypeText)
  );

  /** @type {JSDocReturnTagTextParts} */
  const tagTextParts = [];

  tagTextParts.push(`{${returnTypeJsDocText}}`);

  if (returnTypeJsDocText === 'void') {
    log.trace(
      `${thisFunctionNameTag} return type is 'void' so no need to document`
    );

    return;
  }

  const comment = returnTypeCommentLookup.get();

  log.trace(`${thisFunctionNameTag} comment: %s`, comment);

  if (hasLength(comment)) {
    tagTextParts.push(comment);
  }

  const tagText = tagTextParts.join(`${Spaces.oneSpace}`);

  log.debug(
    `${thisFunctionNameTag} JSDoc returns tag text: ${Strings.stringStart}%s${Strings.stringEnd}`,
    tagText
  );

  jsDocTagsToAdd.push({
    kind: StructureKind.JSDocTag,
    tagName: 'returns',
    text: tagText,
  });
}

/**
 * Generate documentation for a function declaration, function expression or a
 * constructor.
 *
 * @param {FunctionLikeDeclaration} functionLike
 * @param {VariableStatement} [variableStatement]
 */
export function documentAFunction(functionLike, variableStatement) {
  const thisFunctionNameTag = '[function.documentAFunction()]';

  log.debug(`${thisFunctionNameTag} ${Strings.blockStart}`);
  log.debug(`${thisFunctionNameTag} documenting function`);

  const jsDocAbleNode = isDefined(variableStatement)
    ? variableStatement
    : functionLike;

  const existingJsDoc = getJsDoc(jsDocAbleNode);

  /** @type {Map<string, string>} */
  let parameterCommentLookup = new Map();
  let returnTypeCommentLookup = new Map();

  if (isDefined(existingJsDoc)) {
    const parameterTagNames = new Set(['param', 'arg', 'argument']);
    parameterCommentLookup = handleExistingJsDoc(
      existingJsDoc,
      parameterTagNames
    );

    const returnTagNames = new Set(['returns', 'return']);
    returnTypeCommentLookup = handleExistingJsDoc(
      existingJsDoc,
      returnTagNames
    );
  }

  /** @type {JSDocTagStructure[]} */
  const jsDocTagsToAdd = [];

  /* generics */
  const functionTypeParameters = functionLike.getTypeParameters();
  functionTypeParameters.forEach((functionTypeParameter) =>
    documentATypeParameter(functionTypeParameter, jsDocTagsToAdd)
  );

  /* parameters */
  const parameters = functionLike.getParameters();
  parameters.forEach((parameter) =>
    documentAParameter(parameter, jsDocTagsToAdd, parameterCommentLookup)
  );

  /*
   * This function also documents a constructor.
   * For constructors we do not need to document the return type.
   */
  if (
    Node.isArrowFunction(functionLike) ||
    Node.isFunctionDeclaration(functionLike) ||
    Node.isFunctionExpression(functionLike)
  ) {
    const isAGeneratorFunction = Node.isGeneratorable(functionLike);

    log.trace(
      `${thisFunctionNameTag} function is a generator function: ${isAGeneratorFunction}`
    );

    /* return type */
    const returnType =
      functionLike.getReturnTypeNode() ?? functionLike.getReturnType();

    documentAReturnType(returnType, jsDocTagsToAdd, returnTypeCommentLookup);
  }

  if (hasLength(jsDocTagsToAdd)) {
    if (existingJsDoc) {
      existingJsDoc.addTags(jsDocTagsToAdd);
    } else {
      const newJsDoc = addJsDoc(jsDocAbleNode);
      newJsDoc.addTags(jsDocTagsToAdd);
    }
  }

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);
}
