import { Node, StructureKind } from 'ts-morph';

import { log } from '../logger/logger.mjs';
import { hasLength, isDefined, isUndefined } from '../utils/typings.mjs';
import {
  addJsDoc,
  convertTypeStringToJSDocType,
  getJsDoc,
  getJsDocOrCreate,
  sanitizeAStringForJsDoc,
  Strings,
} from '../common.mjs';
import { documentAFunction } from './function.mjs';
import { documentATypeParameter } from './type-parameter.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').ClassMemberTypes} ClassMemberTypes
 * @typedef {import('ts-morph').JSDocTagStructure} JSDocTagStructure
 * @typedef {import('ts-morph').PropertyAssignment} PropertyAssignment
 * @typedef {import('ts-morph').PropertyDeclaration} PropertyDeclaration
 * @typedef {import('ts-morph').PropertySignature} PropertySignature
 */

/**
 * Document a modifier for a class member.
 *
 * We do this because we do not want to lose any information. JavaScript, apart
 * for the `static` keyword, does however not support modifiers so programmatically
 * it does not have any meaning.
 *
 * @param {ClassMemberTypes} classMember
 */
function documentAModifier(classMember) {
  const thisFunctionNameTag = '[class.documentAModifier()]';

  if (Node.isClassStaticBlockDeclaration(classMember)) {
    return;
  }

  const modifiers = classMember?.getModifiers() || [];

  if (hasLength(modifiers)) {
    log.trace(`${thisFunctionNameTag} documenting a class member's modifier`);

    /** @type {JSDocTagStructure[]} */
    const jsDocTagsToAdd = [];

    const modifierTagNames = new Set([
      'private',
      'protected',
      'public',
      'readonly',
      /* 'static', */
    ]);

    for (const modifier of modifiers) {
      const modifierText = modifier?.getText();

      log.debug(
        `${thisFunctionNameTag} class member modifier (as text): ${Strings.stringStart}%s${Strings.stringEnd}`,
        modifierText
      );

      const jsDocSaveText = sanitizeAStringForJsDoc(modifierText);

      log.debug(
        `${thisFunctionNameTag} class member modifier sanitized: ${Strings.stringStart}%s${Strings.stringEnd}`,
        jsDocSaveText
      );

      if (modifierTagNames.has(jsDocSaveText)) {
        jsDocTagsToAdd.push({
          kind: StructureKind.JSDocTag,
          tagName: jsDocSaveText,
        });
      }
    }

    if (hasLength(jsDocTagsToAdd)) {
      const existingJsDoc = getJsDoc(classMember);

      if (existingJsDoc) {
        existingJsDoc.addTags(jsDocTagsToAdd);
      } else {
        const newJsDoc = addJsDoc(classMember);
        newJsDoc.addTags(jsDocTagsToAdd);
      }
    }
  }
}

/**
 * Document a class property initializer
 *
 * @param {import('ts-morph').PropertyDeclaration} classProperty
 */
function documentAnInitializer(classProperty) {
  const thisFunctionNameTag = '[class.documentAnInitializer()]';

  const propertyTypeText = classProperty?.getTypeNode()?.getText();

  if (isUndefined(propertyTypeText)) {
    return;
  }

  log.trace(
    `${thisFunctionNameTag} documenting a class property's initializer`
  );

  log.debug(
    `${thisFunctionNameTag} type (as text): ${Strings.stringStart}%s${Strings.stringEnd}`,
    propertyTypeText
  );

  const jsDocSaveText = convertTypeStringToJSDocType(
    sanitizeAStringForJsDoc(propertyTypeText)
  );

  log.debug(
    `${thisFunctionNameTag} type sanitized: ${Strings.stringStart}%s${Strings.stringEnd}`,
    jsDocSaveText
  );

  if (hasLength(jsDocSaveText)) {
    const jsDoc = getJsDocOrCreate(classProperty);
    jsDoc.addTag({ tagName: 'type', text: `{${jsDocSaveText}}` });
  }
}

/**
 * Document class members
 *
 * @param {ClassMemberTypes} classMember
 */
function documentAClassMember(classMember) {
  documentAModifier(classMember);

  if (
    Node.isPropertyAssignment(classMember) ||
    Node.isPropertyDeclaration(classMember) ||
    Node.isPropertySignature(classMember)
  ) {
    documentAnInitializer(classMember);
  }

  if (
    Node.isConstructorDeclaration(classMember) ||
    Node.isMethodDeclaration(classMember)
  ) {
    documentAFunction(classMember);
  }
}

/**
 * @param {import('ts-morph').ExpressionWithTypeArguments} implementsClause
 * @param {JSDocTagStructure[]} jsDocTagsToAdd
 */
function documentAImplementsClause(implementsClause, jsDocTagsToAdd) {
  const thisFunctionNameTag = '[class.documentAImplementsClause()]';

  log.trace(`${thisFunctionNameTag} documenting a class implements clause`);

  const implementsText = implementsClause?.getText();

  log.debug(
    `${thisFunctionNameTag} implements clause (as text): ${Strings.stringStart}%s${Strings.stringEnd}`,
    implementsText
  );

  const jsDocSaveText = convertTypeStringToJSDocType(
    sanitizeAStringForJsDoc(implementsText)
  );

  log.debug(
    `${thisFunctionNameTag} implements clause sanitized: ${Strings.stringStart}%s${Strings.stringEnd}`,
    jsDocSaveText
  );

  if (isDefined(jsDocSaveText)) {
    jsDocTagsToAdd.push({
      kind: StructureKind.JSDocTag,
      tagName: 'implements',
      text: `{${jsDocSaveText}}`,
    });
  }
}

/**
 * Document a class
 *
 * @param {import('ts-morph').ClassDeclaration} classDeclaration
 */
export function documentAClass(classDeclaration) {
  const thisFunctionNameTag = '[class.documentAClass()]';

  log.debug(`${thisFunctionNameTag} ${Strings.blockStart}`);
  log.debug(
    `${thisFunctionNameTag} documenting class '%s'`,
    classDeclaration.getName()
  );

  /** @type {JSDocTagStructure[]} */
  const jsDocTagsToAdd = [];

  const isAbstract = classDeclaration.getAbstractKeyword();

  if (isAbstract) {
    jsDocTagsToAdd.push({
      kind: StructureKind.JSDocTag,
      tagName: 'abstract',
    });
  }

  /* generics */
  classDeclaration
    .getTypeParameters()
    .forEach((typeParam) => documentATypeParameter(typeParam, jsDocTagsToAdd));

  /* implements clauses */
  classDeclaration
    .getImplements()
    .forEach((implementsClause) =>
      documentAImplementsClause(implementsClause, jsDocTagsToAdd)
    );

  if (hasLength(jsDocTagsToAdd)) {
    const jsDoc = getJsDocOrCreate(classDeclaration);
    jsDoc.addTags(jsDocTagsToAdd);
  }

  /* class members */
  classDeclaration
    .getMembers()
    .forEach((classMember) => documentAClassMember(classMember));

  log.debug(`${thisFunctionNameTag} ${Strings.blockEnd}`);
}
