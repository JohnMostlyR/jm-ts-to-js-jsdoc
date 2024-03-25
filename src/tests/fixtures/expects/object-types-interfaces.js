/*
 * Source file for testing that the program documents an interface
 */

/**
 * @typedef {object} Person
 * @property {string} name
 * @property {number} age
 * @property {object} [address]
 * @property {string} address.street
 * @property {number} address.houseNumber
 * @property {string} address.houseNumberAddition
 * @property {string} address.postalcode
 * @property {string} address.city
 * @property {object} [authentication]
 * @property {string} authentication.id
 * @property {() => Promise<string>} authentication.signIn Called when the user wants to signin
 */
