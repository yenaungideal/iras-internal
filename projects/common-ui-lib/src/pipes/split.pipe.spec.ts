import { SplitPipe } from './split.pipe';

describe('transform value', () => {
  it('paste between text should work', () => {
    const pipe = new SplitPipe();
    const expectedValue = '2';
    const value = pipe.transform("G123456g,2", ",", 1);
    expect(value[0]).toEqual(expectedValue);
  });
});
