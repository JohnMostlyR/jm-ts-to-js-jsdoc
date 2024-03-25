import { StructureKind } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { isString } from '../utils/typings.mjs';

import { Spaces } from '../common.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 */

/**
 * @param {import('ts-morph').TypeParameterDeclaration} typeParameter
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 */
export function documentATypeParameter(typeParameter, jsDocTagsToAdd) {
  const thisFunctionNameTag = '[type-parameter.documentATypeParameter()]';

  const typeParameterDeclarationStructure = typeParameter.getStructure();

  log.trace(
    `${thisFunctionNameTag} type parameter declaration structure: %o`,
    typeParameterDeclarationStructure
  );

  const {
    name: typeParameterName,
    constraint: typeParameterContraint,
    default: typeParameterDefault,
  } = typeParameterDeclarationStructure;

  log.debug(
    `${thisFunctionNameTag} documenting type parameter '${typeParameterName}'`
  );

  const tagTextParts = [];

  /* constraint */
  if (isString(typeParameterContraint)) {
    log.trace(
      `${thisFunctionNameTag} type parameter constraint: %s`,
      typeParameterContraint
    );

    const constraint = `{${typeParameterContraint}}`;

    tagTextParts.push(constraint);
  }

  /* default value */
  if (isString(typeParameterDefault)) {
    const nameAndDefaultValue = `[${typeParameterName}${Spaces.oneSpace}=${Spaces.oneSpace}${typeParameterDefault}]`;

    log.trace(
      `${thisFunctionNameTag} type parameter name and default value: ${nameAndDefaultValue}`
    );

    tagTextParts.push(nameAndDefaultValue);
  } else {
    tagTextParts.push(typeParameterName);
  }

  const tagText = tagTextParts.join(`${Spaces.oneSpace}`);

  /**
   * @type {JSDocTagStructure}
   */
  const jsDocTag = {
    kind: StructureKind.JSDocTag,
    tagName: 'template',
    text: tagText,
  };

  log.trace(`${thisFunctionNameTag} tag structure: %o`, jsDocTag);

  jsDocTagsToAdd.push(jsDocTag);
}
