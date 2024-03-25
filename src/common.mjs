import { StructureKind } from 'ts-morph';

import { log } from './logger/logger.mjs';
import {
  hasLength,
  isDefined,
  isString,
  isUndefinedOrNull,
} from './utils/typings.mjs';

/**
 * Imported types
 *
 * @typedef {import('ts-morph').JSDoc} JSDoc
 * @typedef {import('ts-morph').JSDocableNode} JSDocableNode
 * @typedef {import('ts-morph').JSDocStructure} JSDocStructure
 */

export const NewLine = {
  newLine: '\n',
  twoNewLines: '\n\n',
};

export const Spaces = {
  noSpace: '',
  oneSpace: ' ',
  twoSpaces: ' '.repeat(2),
  fourSpaces: ' '.repeat(4),
};

export const Strings = {
  blockStart: `${'👉'.repeat(3)}`,
  blockEnd: `${'👈'.repeat(3)}`,
  emptyString: `${Spaces.noSpace}`,
  stringStart: '👉',
  stringEnd: '👈',
};

/**
 * Sanitizes a string.
 * e.g. it removes JavaScript comments and multiple spaces.
 *
 * @template T
 * @param {string | T} input
 * @returns {string | T}
 */
export function sanitizeAStringForJsDoc(input) {
  const thisFunctionNameTag = '[common.sanitizeAStringForJsDoc()]';

  log.debug(
    `${thisFunctionNameTag} input: ${Strings.stringStart}%s${Strings.stringEnd}`,
    input
  );

  let output = input;

  if (isString(input) && hasLength(input)) {
    output = input
      /* Replace tabs with spaces */
      .replace(/\t/g, Spaces.oneSpace)
      /* Remove JSDoc and multi-line comments */
      .replace(/\s*\/\*{1,}.+?\*\/\s*/gm, `${Strings.emptyString}`)
      .replace(/^\s*\/\*{1,}.+?\*\/\n/gms, `${Strings.emptyString}`)
      .replace(/\/(\*+)/g, `/${Spaces.oneSpace}$1`)
      /* Remove spaces in front of punctuation characters */
      .replace(/\s+([,;.])/g, '$1')
      /* Add spaces after a `,` or `;` character */
      .replace(/([,;])(\S.*)/g, `$1${Spaces.oneSpace}$2`)
      /* pad block contents */
      .replace(/^{(\S.*)/, `{${Spaces.oneSpace}$1`)
      .replace(/(.*\S)}$/, `$1${Spaces.oneSpace}}`)
      .replace(/^{\s+\}$/, `{}`)
      .trim();
  }

  log.debug(
    `${thisFunctionNameTag} output: ${Strings.stringStart}%s${Strings.stringEnd}`,
    output
  );

  return output;
}

/**
 * Convert a string representing a type to a JSDoc compatible type.
 *
 * @param {string | undefined} input TypeScript type string
 * @returns {string} JSDoc compatible type string
 */
export function convertTypeStringToJSDocType(input) {
  const thisFunctionNameTag = '[common.convertTypeStringToJSDocType()]';

  log.debug(
    `${thisFunctionNameTag} input: ${Strings.stringStart}%s${Strings.stringEnd}`,
    input
  );

  let output = '?';

  if (isString(input) && hasLength(input)) {
    output = input
      /* Remove JavaScript single line comments */
      .replace(/\s*\/\/.*/gm, NewLine.newLine)
      /* Replace new-line characters */
      .replace(/\s*\n\s*/g, Spaces.oneSpace)
      /* Remove spaces in front of punctuation characters */
      .replace(/\s+([,;.])/g, '$1')
      /* Add spaces after a `,` or `;` character */
      .replace(/([,;])(\S.*)/g, `$1${Spaces.oneSpace}$2`)
      /* JSDoc uses an astrix to document an `any` type */
      .replace(/^any(\[\])?$/, '*$1')
      .replace(/^(\w+)<any(\[\])?>$/i, '$1<*$2>')
      .replace(/^(\w+)<any(\[\])?,\s*([^>]+)>$/i, '$1<*$2, $3>')
      .replace(/^(\w+)<([^,]+),\s*any(\[\])?>$/i, '$1<$2, *$3>')
      /* JSDoc uses a questionmark to document an `unknown` type */
      .replace(/^unknown(\[\])?$/, '?$1')
      .replace(/^(\w+)<unknown(\[\])?>$/i, '$1<?$2>')
      .replace(/^(\w+)<unknown(\[\])?,\s*([^>]+)>$/i, '$1<?$2, $3>')
      .replace(/^(\w+)<([^,]+),\s*unknown(\[\])?>$/i, '$1<$2, ?$3>')
      /* Prefer `([type])[]` over `Array<[type]>` */
      .replace(/^Array<([^>]+)>$/, '($1)[]')
      /* ungroup single items */
      .replace(/^\(([\w*?]*|\{.*\})\)\[\]$/, '$1[]')
      .trim();
  }

  log.debug(
    `${thisFunctionNameTag} output: ${Strings.stringStart}%s${Strings.stringEnd}`,
    output
  );

  return output;
}

/**
 * @param {JSDocableNode} node
 * @returns {JSDoc | undefined}
 */
export function getJsDoc(node) {
  if (isUndefinedOrNull(node)) return;

  return node.getJsDocs().at(-1);
}

/**
 * @param {JSDocableNode} node
 * @returns {JSDoc}
 */
export function addJsDoc(node) {
  // here we'd like to detect whether the node is preceded by a multi-line
  // comment and if so we'd need to remove it.
  return node.addJsDoc({ description: `${NewLine.newLine}` }); // force multi-line
}

/**
 * Get JSDoc for a node or create one if there isn't any
 *
 * @param {JSDocableNode} node
 * @returns {JSDoc}
 */
export function getJsDocOrCreate(node) {
  return getJsDoc(node) || addJsDoc(node);
}

/**
 * @param {JSDocStructure[]} docs
 * @returns {JSDocStructure | undefined}
 */
export function getJsDocFromStructure(docs) {
  if (isDefined(docs) === false) return;

  return docs.find((doc) => doc.kind === StructureKind.JSDoc);
}

/**
 * Given an existing JSDoc object and a `Set` tag names, tag name plus synonyms,
 * it returns an object where the key is the tag's identifier and the value is
 * the comment, if any, added to the tag.
 *
 * @param {JSDoc} existingJsDoc
 * @param {Set<string>} tagNames a `Set` of tag names, tag name plus synonyms
 * @returns {Map<string | null, string>}
 */
export function handleExistingJsDoc(existingJsDoc, tagNames) {
  const thisFunctionNameTag = '[common.handleExistingJsDoc()]';

  if (isUndefinedOrNull(existingJsDoc)) {
    throw new Error(`${thisFunctionNameTag} existingJsDoc must be defined`);
  }

  if (isUndefinedOrNull(tagNames)) {
    throw new Error(`${thisFunctionNameTag} tagNames must be defined`);
  }

  /** @type {Map<string, string>} */
  const commentLookup = new Map();

  const jsDocTags = existingJsDoc.getTags();
  const filteredJsDocTags = jsDocTags.filter((tag) =>
    tagNames.has(tag.getTagName())
  );

  if (hasLength(filteredJsDocTags)) {
    filteredJsDocTags.forEach((tag) => {
      const { compilerNode } = tag;
      const { name: identifier } = compilerNode;

      /** @type {?string} */
      const JsDocTextIdentifier = identifier?.getText().trim();

      log.trace(
        `${thisFunctionNameTag} existing JSDoc parameter tag identifier: ${Strings.stringStart}%s${Strings.stringEnd}`,
        JsDocTextIdentifier
      );

      const parameterTagComment =
        tag.getCommentText()?.trim() || Strings.emptyString;

      log.trace(
        `${thisFunctionNameTag} existing JSDoc parameter tag comment: ${Strings.stringStart}%s${Strings.stringEnd}`,
        parameterTagComment
      );

      const sanitizedTagComment = sanitizeAStringForJsDoc(parameterTagComment);

      log.trace(
        `${thisFunctionNameTag} existing JSDoc parameter tag comment (sanitized): ${Strings.stringStart}%s${Strings.stringEnd}`,
        sanitizedTagComment
      );

      if (isString(sanitizedTagComment) && hasLength(sanitizedTagComment)) {
        commentLookup.set(JsDocTextIdentifier, sanitizedTagComment);
      }
    });

    /* just easier to remove and replace then to update */
    filteredJsDocTags.forEach((tag) => tag.remove());
  }

  return commentLookup;
}
