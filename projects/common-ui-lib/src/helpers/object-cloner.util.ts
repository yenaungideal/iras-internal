export const cloneObject = ({ obj }: { obj: any }) => Object.assign({}, obj);
export const cloneArray = ({ arr }: { arr: any[] }) => arr.map((item) => Object.assign({}, item));
export const jsonCloneUsingStringify = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
