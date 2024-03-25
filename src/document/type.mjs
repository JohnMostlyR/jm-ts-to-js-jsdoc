import { Node, StructureKind, SyntaxKind, ts } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { getLastElement } from '../utils/arrays.mjs';
import { hasLength, isDefined } from '../utils/typings.mjs';

import {
  convertTypeStringToJSDocType,
  getJsDocOrCreate,
  sanitizeAStringForJsDoc,
  Spaces,
  Strings,
} from '../common.mjs';
import { documentAnObjectMethod } from './object-method.mjs';
import { documentATypeParameter } from './type-parameter.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').InterfaceDeclaration} InterfaceDeclaration
 * @typedef {import('ts-morph').JSDoc} JSDoc
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 * @typedef {import('ts-morph').TypeNode} TypeNode
 * @typedef {import('../types.mjs').JSDocPropertyAndParameterTagTextParts} JSDocPropertyAndParameterTagTextParts
 */

/**
 * Get the children of an object node
 *
 * @param {Node | undefined} node
 * @returns {Node<ts.Node>[]}
 */
function getChildProperties(node) {
  if (isDefined(node) === false) return [];

  const nodeType = node.getType();
  const properties = nodeType.getProperties();

  if (hasLength(properties) === false) return [];

  const valueDeclarations = properties
    .map((property) => property?.getValueDeclaration())
    .filter((valueDeclaration) => valueDeclaration?.getParent() === node);

  return valueDeclarations ?? [];
}

/**
 * @param {import('ts-morph').PropertySignature} objectProperty
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 * @param {string} [parentName='']
 */
function documentAnObjectProperty(
  objectProperty,
  jsDocTagsToAdd,
  parentName = ''
) {
  const thisFunctionNameTag = '[type.documentAnObjectProperty()]';

  let name = objectProperty.getName();

  if (hasLength(parentName)) {
    name = `${parentName}.${name}`;
  }

  log.debug(`${thisFunctionNameTag} documenting property '${name}'`);

  const objectPropertyKind = objectProperty.getKind();
  const objectPropertyKindName = objectProperty.getKindName();

  log.debug(
    `${thisFunctionNameTag} property is of kind '%s (%s)'`,
    objectPropertyKindName,
    objectPropertyKind
  );

  const isOptional = objectProperty.hasQuestionToken();
  const existingJsDoc = objectProperty.getJsDocs();

  if (objectPropertyKind === SyntaxKind.PropertySignature) {
    const typeNode = objectProperty.getTypeNode();

    const children = getChildProperties(typeNode);

    const type = hasLength(children)
      ? 'object'
      : convertTypeStringToJSDocType(
          sanitizeAStringForJsDoc(typeNode?.getText())
        );

    /** @type {JSDocPropertyAndParameterTagTextParts} */
    const tagTextParts = [];

    tagTextParts.push(`{${type}}`);
    tagTextParts.push(isOptional ? `[${name}]` : name);

    if (hasLength(existingJsDoc)) {
      const description = existingJsDoc[0].getDescription();
      log.debug(
        `${thisFunctionNameTag} existing description: '%s'`,
        description
      );

      const sanitizedDescription = sanitizeAStringForJsDoc(description);
      log.debug(
        `${thisFunctionNameTag} sanitized description: '%s'`,
        sanitizedDescription
      );

      if (hasLength(sanitizedDescription)) {
        tagTextParts.push(sanitizedDescription);
      }
    }

    const tagText = tagTextParts.join(Spaces.oneSpace);

    /** @type {JSDocTagStructure} */
    const jsDocTag = {
      kind: StructureKind.JSDocTag,
      tagName: 'property',
      text: tagText,
    };

    log.trace(`${thisFunctionNameTag} tag structure: %o`, jsDocTag);

    jsDocTagsToAdd.push(jsDocTag);

    if (hasLength(children)) {
      children.forEach((child) => {
        documentAnObjectProperty(child, jsDocTagsToAdd, name);
      });
    }
  } else if (objectPropertyKind === SyntaxKind.MethodSignature) {
    documentAnObjectMethod(objectProperty, jsDocTagsToAdd, parentName);
  } else {
    log.warn(
      `${thisFunctionNameTag} UNSUPPORTED: documenting property of kind '%s (%s)' is not supported`,
      objectPropertyKindName,
      objectPropertyKind
    );

    log.warn(`${thisFunctionNameTag} UNSUPPORTED: please review '%s'`, name);
  }
}

/**
 * Document an interface
 *
 * @param {InterfaceDeclaration} interfaceDeclaration
 * @returns {string}
 */
export function documentAnInterface(interfaceDeclaration) {
  const thisFunctionNameTag = '[type.documentAnInterface()]';
  log.debug(`${thisFunctionNameTag} ${Strings.blockStart}`);

  const interfaceName = interfaceDeclaration.getName();

  log.debug(`${thisFunctionNameTag} Documenting interface: '${interfaceName}'`);

  /** @type {JSDocTagStructure[]} */
  const jsDocTagsToAdd = [];

  /* generics */
  const interfaceTypeParameters = interfaceDeclaration.getTypeParameters();
  interfaceTypeParameters.forEach((interfaceTypeParameter) =>
    documentATypeParameter(interfaceTypeParameter, jsDocTagsToAdd)
  );

  /* interface */
  jsDocTagsToAdd.push({
    kind: StructureKind.JSDocTag,
    tagName: 'typedef',
    text: `{object}${Spaces.oneSpace}${interfaceName}`,
  });

  log.debug(
    `${thisFunctionNameTag} added JSDoc tag: %o`,
    getLastElement(jsDocTagsToAdd)
  );

  /* interface properties */
  const interfaceProperties = interfaceDeclaration.getProperties();
  interfaceProperties.forEach((interfaceProperty) =>
    documentAnObjectProperty(interfaceProperty, jsDocTagsToAdd)
  );

  /* interface methods */
  const interfaceMethods = interfaceDeclaration.getMethods();
  interfaceMethods.forEach((interfaceMethod) =>
    documentAnObjectMethod(interfaceMethod, jsDocTagsToAdd)
  );

  /* output */

  /** @type {JSDoc | undefined} */
  let interfaceJsDoc;

  if (hasLength(jsDocTagsToAdd)) {
    interfaceJsDoc = getJsDocOrCreate(interfaceDeclaration);
    interfaceJsDoc.addTags(jsDocTagsToAdd);
  }

  const jsDocFullText = interfaceJsDoc.getFullText();

  log.debug(
    `${thisFunctionNameTag} generated JSDoc for interface '${interfaceName}': %s`,
    `${Strings.stringStart}\n${jsDocFullText}${Strings.stringEnd}`
  );

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);

  return jsDocFullText;
}

/**
 * Document a type alias
 *
 * @param {import('ts-morph').TypeAliasDeclaration} typeAliasDeclaration
 * @returns {string} A JSDoc comment containing the typedef
 */
export function documentATypeAlias(typeAliasDeclaration) {
  const thisFunctionNameTag = '[type.documentATypeAlias()]';
  log.debug(`${thisFunctionNameTag} %s`, Strings.blockStart);

  const typeAliasName = typeAliasDeclaration.getName();

  log.debug(
    `${thisFunctionNameTag} Documenting type alias: '${typeAliasName}'`
  );

  /** @type {JSDocTagStructure[]} */
  const jsDocTagsToAdd = [];

  /* generics */
  const typeAliasTypeParameters = typeAliasDeclaration.getTypeParameters();
  typeAliasTypeParameters.forEach((typeAliasTypeParameter) =>
    documentATypeParameter(typeAliasTypeParameter, jsDocTagsToAdd)
  );

  /**
   * @type {JSDocTagStructure}
   */
  const jsDocTag = {
    kind: StructureKind.JSDocTag,
    tagName: 'typedef',
    text: Strings.emptyString,
  };

  const typeAliasTypeNode = typeAliasDeclaration.getTypeNode();

  if (
    Node.isTypeLiteral(typeAliasTypeNode) &&
    typeAliasDeclaration.getType().isObject()
  ) {
    const tagText = { text: `{object}${Spaces.oneSpace}${typeAliasName}` };

    jsDocTagsToAdd.push({
      ...jsDocTag,
      ...tagText,
    });

    log.debug(
      `${thisFunctionNameTag} Tag added: %o`,
      getLastElement(jsDocTagsToAdd)
    );

    /* type alias properties */
    typeAliasTypeNode.getProperties().forEach((typeAliasProperty) => {
      documentAnObjectProperty(typeAliasProperty, jsDocTagsToAdd);
    });

    /* type alias methods */
    const typeAliasMethods = typeAliasTypeNode.getMethods();
    typeAliasMethods.forEach((typeAliasMethod) =>
      documentAnObjectMethod(typeAliasMethod, jsDocTagsToAdd)
    );
  } else {
    const typeText = typeAliasTypeNode.getText({
      trimLeadingIndentation: true,
    });

    log.debug(
      `${thisFunctionNameTag} type text: ${Strings.stringStart}%s${Strings.stringEnd}`,
      typeText
    );

    const jsDocSaveText = convertTypeStringToJSDocType(
      sanitizeAStringForJsDoc(typeText)
    );

    log.debug(
      `${thisFunctionNameTag} sanitized type text: ${Strings.stringStart}%s${Strings.stringEnd}`,
      jsDocSaveText
    );

    const tagText = `{${jsDocSaveText}}${Spaces.oneSpace}${typeAliasName}`;

    jsDocTagsToAdd.push({
      ...jsDocTag,
      ...{ text: tagText },
    });

    log.debug(
      `${thisFunctionNameTag} Tag added: %o`,
      getLastElement(jsDocTagsToAdd)
    );
  }

  /* output */

  /** @type {JSDoc | undefined} */
  let typeAliasJsDoc;

  if (hasLength(jsDocTagsToAdd)) {
    typeAliasJsDoc = getJsDocOrCreate(typeAliasDeclaration);
    typeAliasJsDoc.addTags(jsDocTagsToAdd);
  }

  const jsDocFullText = typeAliasJsDoc.getFullText();

  log.debug(
    `${thisFunctionNameTag} generated JSDoc for type alias '${typeAliasName}': %s`,
    `${Strings.stringStart}\n${jsDocFullText}${Strings.stringEnd}`
  );

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);

  return jsDocFullText;
}
