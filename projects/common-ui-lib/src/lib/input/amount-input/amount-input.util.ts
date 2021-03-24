export const regexAmountInputPattern = {
  amountThousandSeparator: new RegExp('(\\-?\\d)(?=(\\d{3})+(?!\\d))', 'g'),
  amountPattern: new RegExp('^\\s*((\\-?\\d+(,?\\d{3})*(\\.\\d{0,2})?)|((\\-?\\d*(,?\\d{3})*(\\.\\d{1,2}))))\\s*$'),
};

export function getThousandSeparatedAmount(val: string | number) {
  if (val === '-') {
    return val;
  }

  if (!!!val) {
    return;
  }
  const tmp = +val.toString();
  let convertedValue = val;

  const res = val.toString().split('.');

  if (res.length > 0 || (res.length > 1 && res[1].length < 3)) {
    convertedValue = tmp.toFixed(2);
  }

  return convertedValue.toString().replace(regexAmountInputPattern.amountThousandSeparator, '$1,');
}

export function getThousandSeparatedForAmountFilter(val: string | number) {
  if (val === '-') {
    return val;
  }
  return val.toString().replace(regexAmountInputPattern.amountThousandSeparator, '$1,');
}
