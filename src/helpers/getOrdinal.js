// --------------------------------
// Special thanks to:
// Brandon McKinney @pagefold, Gleb Bahmutov @bahmutov 
//
// nTh.js - https://github.com/dperish/nTh.js/blob/master/nTh.js
// -------------------------------- 

const SUFFIXES = [
  'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'
]

export default function nth(n) {
  if (/^(string|number)$/.test(typeof n) === false) {
    return n
  }

  let match = n.toString().match(/\d$/)

  if (!match) {
    return n
  }

  let suffix = SUFFIXES[match[0]];

  if (/1[123]$/.test(n)) {
    suffix = 'th'
  }

  return n + suffix;
}
nth.of = function (x, y) {
  return nth(x) + ' of ' + y
}
