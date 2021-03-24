import { modifyValueOnPaste } from './modify-value-on-paste.util';

describe('ModifyValueOnPaste', () => {
  it('paste between text should work', () => {
    const expectedValue = 'HE888LLO ';
    const value = modifyValueOnPaste({
      valueAfterPaste: 'HE       888     LLO ',
      pastedText: '       888     ',
    });
    expect(value).toEqual(expectedValue);
  });

  it('paste at the end should work', () => {
    const expectedValue = 'HELLO, WORLD!';
    const value = modifyValueOnPaste({
      valueAfterPaste: 'HELLO,     WORLD!     ',
      pastedText: '    WORLD!     ',
    });
    expect(value).toEqual(expectedValue);
  });
});
