export const isInputValid = ({ input, pattern }: { input: string; pattern: string }) => {
  const regexPattern: RegExp = new RegExp(pattern);
  const patternMatched = (input + '').match(regexPattern);
  if (!patternMatched) {
    return false;
  }
  return true;
};
