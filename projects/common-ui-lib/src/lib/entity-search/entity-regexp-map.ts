export const entityRegExpMap: Map<string, RegExp> = new Map([
  ['1', new RegExp('^[sStT][0-9]{7}[a-zA-Z]$')],
  ['2', new RegExp('^[fFgG][0-9]{7}[a-zA-Z]$')],
  ['5', undefined],
  ['6', new RegExp('^[0-9]{9}[a-zA-Z]$')],
  ['12', undefined],
  ['20', undefined],
  ['35', new RegExp('^[a-zA-Z][0-9]{2}[a-zA-Z]{2}[0-9]{4}[a-zA-Z]$')],
  ['105', new RegExp('^[aA][0-9a-zA-Z]{9}$')],
  ['300', new RegExp('^[0-9]{13}$')],
]);
