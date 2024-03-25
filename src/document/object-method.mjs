import { StructureKind, ts } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { hasLength, isDefined } from '../utils/typings.mjs';
import { sanitizeAStringForJsDoc, Spaces, Strings } from '../common.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 */

/**
 * @param {import('ts-morph').ParameterDeclaration} parameter
 * @param {string[]} tagParameters
 */
function documentAParameter(parameter, tagParameters) {
  const thisFunctionNameTag = '[object-method.documentAParameter()]';

  const parameterName = parameter.getName();
  log.debug(`${thisFunctionNameTag} documenting parameter '${parameterName}'`);

  const parameterInitializer = parameter.getInitializer();

  if (isDefined(parameterInitializer)) {
    log.warn(
      `${thisFunctionNameTag} TODO: implement initializer documentation: %o`,
      parameterInitializer
    );
  }

  const parameterIsRestParameter = parameter.isRestParameter();

  let tagIdentifierConstruct = parameterIsRestParameter
    ? `...${parameterName}`
    : parameterName;

  const parameterHasQuestionToken = parameter.hasQuestionToken();

  tagIdentifierConstruct = parameterHasQuestionToken
    ? `${tagIdentifierConstruct}?`
    : tagIdentifierConstruct;

  const parameterTypeText =
    parameter.getTypeNode()?.getText() || parameter.getType().getText();

  log.trace(
    `${thisFunctionNameTag} parameter type text: ${Strings.stringStart}%s${Strings.stringEnd}`,
    parameterTypeText
  );

  const sanitizedTypeText = sanitizeAStringForJsDoc(parameterTypeText);
  tagIdentifierConstruct = sanitizedTypeText
    ? `${tagIdentifierConstruct}:${Spaces.oneSpace}${sanitizedTypeText}`
    : tagIdentifierConstruct;

  log.debug(
    `${thisFunctionNameTag} parameter type and identifier: ${Strings.stringStart}%s${Strings.stringEnd}`,
    tagIdentifierConstruct
  );

  tagParameters.push(tagIdentifierConstruct);
}

/**
 * @param {import('ts-morph').MethodSignature} method
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 * @param {string} [parentName='']
 */
export function documentAnObjectMethod(
  method,
  jsDocTagsToAdd,
  parentName = ''
) {
  const thisFunctionNameTag = '[object-method.documentAnObjectMethod()]';

  let methodName = method.getName();

  if (hasLength(parentName)) {
    methodName = `${parentName}.${methodName}`;
  }

  log.debug(`${thisFunctionNameTag} documenting method '${methodName}'`);

  const methodTypeParameters = method.getTypeParameters();

  /* generics */
  if (hasLength(methodTypeParameters)) {
    log.warn(
      `${thisFunctionNameTag} UNSUPPORTED: documenting an object method's type parameter is not supported`
    );
    log.warn(
      `${thisFunctionNameTag} UNSUPPORTED: please review '${methodName}'`
    );
  }

  /* parameters */
  const tagParameters = [];
  const methodParameters = method.getParameters();

  if (hasLength(methodParameters)) {
    methodParameters.forEach((parameter) =>
      documentAParameter(parameter, tagParameters)
    );
  }

  const tagParametersText = tagParameters.join(`,${Spaces.oneSpace}`);

  /* return type */
  const methodReturnTypeText = method
    .getReturnType()
    .getText(undefined, ts.TypeFormatFlags.OmitParameterModifiers);

  const methodTextPart = `{(${tagParametersText})${Spaces.oneSpace}=>${Spaces.oneSpace}${methodReturnTypeText}}`;

  const tagTextParts = [];
  tagTextParts.push(methodTextPart);

  const methodHasQuestionToken = method.hasQuestionToken();

  const tagIdentifier = methodHasQuestionToken ? `[${methodName}]` : methodName;

  tagTextParts.push(tagIdentifier);

  /* JSDoc description */
  const methodJsDocs = method.getJsDocs();

  if (hasLength(methodJsDocs)) {
    const description = methodJsDocs[0].getDescription();
    const sanitizedDescription = sanitizeAStringForJsDoc(description);

    if (hasLength(sanitizedDescription)) {
      tagTextParts.push(sanitizedDescription);
    }
  }

  const tagText = tagTextParts.join(Spaces.oneSpace);

  /**
   * @type {JSDocTagStructure}
   */
  const jsDocTag = {
    kind: StructureKind.JSDocTag,
    tagName: 'property',
    text: tagText,
  };

  jsDocTagsToAdd.push(jsDocTag);
}
