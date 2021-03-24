import { IdTypeFinderPipe } from './entity-idtype-finder.pipe';

describe('transform value', () => {
  it('IdTypeFinderPipe should work', () => {
    const pipe = new IdTypeFinderPipe();
    const expectedValue = 'FIN';
    const list = [
      { key: '1', text: 'NRIC' },
      { key: '2', text: 'FIN' },
    ];
    const value = pipe.transform('2', list);
    expect(value).toEqual(expectedValue);
  });

  it('IdTypeFinderPipe should return empty', () => {
    const pipe = new IdTypeFinderPipe();
    const expectedValue = '';
    const list = [
      { key: '1', text: 'NRIC' },
      { key: '2', text: 'FIN' },
    ];
    const value = pipe.transform('4', list);
    expect(value).toEqual(expectedValue);
  });
});
