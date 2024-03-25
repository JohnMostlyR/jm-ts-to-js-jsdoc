/*
 * Source file for testing that the program references the return type.
 */

/**
 * @typedef {object} AType
 * @property {string} aKey
 */

/**
 * @param {string} p
 * @returns {AType}
 */
export function aFunction(p) {
    return { aKey: p };
}
