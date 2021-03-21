import test from 'ava'

import { codepoints, characters, regexp } from '../src/main.js'

test('codepoints has a valid shape', (t) => {
  t.true(Array.isArray(codepoints))
  t.true(codepoints.every(isValidCodepoint))
})

const isValidCodepoint = function (codepoint) {
  return Number.isInteger(codepoint) && codepoint >= 0
}

test('codepoints does not contain duplicates', (t) => {
  t.is([...new Set(codepoints)].length, codepoints.length)
})

test('codepoints is sorted', (t) => {
  // eslint-disable-next-line fp/no-mutating-methods
  t.deepEqual([...codepoints].sort(sortByNumber), codepoints)
})

const sortByNumber = function (numberA, numberB) {
  return numberA - numberB
}

test('characters has a valid shape', (t) => {
  t.true(Array.isArray(characters))
  t.true(characters.every(isCharacter))
})

const isCharacter = function (character) {
  return typeof character === 'string' && character.length === 1
}

test('characters corresponds to codepoints', (t) => {
  t.is(characters.length, codepoints.length)
  t.true(
    characters.every(
      (character, index) => character.charCodeAt(0) === codepoints[index],
    ),
  )
})

test('regexp matches none of the characters', (t) => {
  t.true(characters.every((character) => !regexp.test(character)))
})

const NON_CROSS_PLATFORM_CHAR = '\u20bc'

test('regexp matches some characters', (t) => {
  t.true(regexp.test(`test ${NON_CROSS_PLATFORM_CHAR} test`))
})

test('regexp uses the global flag', (t) => {
  t.is(
    `test ${NON_CROSS_PLATFORM_CHAR} ${NON_CROSS_PLATFORM_CHAR} test`.replace(
      regexp,
      '',
    ),
    'test   test',
  )
})
