export const modifyValueOnPaste = ({
  valueAfterPaste,
  pastedText,
}: {
  valueAfterPaste: string;
  pastedText: string;
}) => {
  const index = (valueAfterPaste || '').indexOf(pastedText);
  if (index === -1) {
    return;
  }

  /* 
    Scenario 1- 
    Before hello kumar
    After hello   PREM   kumar
    Expected hello PREM kumar

    Scenario 2- 
    Before hello
    After hello   PREM   
    Expected hello PREM
  */
  const pastedTextTrimmed = pastedText.trim();
  const finalValue =
    (valueAfterPaste.substring(0, index) || '') +
    pastedTextTrimmed +
    (valueAfterPaste.substring(index + pastedText.length, valueAfterPaste.length) || '');

  return finalValue;
};
