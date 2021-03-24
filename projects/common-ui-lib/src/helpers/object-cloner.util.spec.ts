import { cloneArray, cloneObject } from './object-cloner.util';

describe('ObjectClonerUtilTest', () => {
  it('#cloneObject should return a cloned object', () => {
    const input = { name: 'test', description: 'test' };
    expect(cloneObject({ obj: input })).toEqual(input);
  });

  it('#cloneArray should return a cloned array', () => {
    const input = [{ name: 'test', description: 'test' }];
    expect(cloneArray({ arr: input })).toEqual(input);
  });
});
