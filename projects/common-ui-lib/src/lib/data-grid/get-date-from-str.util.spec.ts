import { getDateFromStr } from './get-date-from-str.util';

describe('get-date-from-str.util', () => {
  it('should get date when a valid string is passed ', () => {
    const date = getDateFromStr('2020-10-10');
    const jsDate = new Date(2020, 9, 10);
    expect(date).toEqual(jsDate);
  });

  it('return void if date is null/undefined/empty ', () => {
    let date = getDateFromStr(null);
    expect(date).toBeFalsy(date);
    date = getDateFromStr(undefined);
    expect(date).toBeFalsy(date);
    date = getDateFromStr('');
    expect(date).toBeFalsy(date);
  });

  it('invalid date should return NaN', () => {
    expect(isNaN((getDateFromStr('8348klj--sj-') || ({} as any)).getTime())).toBeTrue();
  });
});
