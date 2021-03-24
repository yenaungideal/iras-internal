import { readFileSync, writeFileSync } from 'fs';

class VersionIncrementor {
  filePaths = ['dist/common-ui-lib/package.json', 'projects/common-ui-lib/package.json'];

  constructor() {}

  bumpVersion() {
    for (const filePath of this.filePaths) {
      const json = JSON.parse(readFileSync(filePath, { encoding: 'utf8' }));
      json.version = this.increment(json.version);
      writeFileSync(filePath, JSON.stringify(json, null, 4));
    }
  }

  private increment(version: string) {
    const terms = version.split('.').map((e) => {
      return parseInt(e, 10);
    });
    if (terms.length !== 3) {
      return version;
    }
    if (++terms[2] > 9) {
      ++terms[1];
      terms[2] = 0;
    }

    // major version increment
    if (+terms.slice(1).join('') > 99) {
      return this.incrementMajor(version);
    }
    return terms.join('.');
  }

  private incrementMajor(version: string) {
    return [parseInt(version.split('.')[0], 10) + 1, 0, 0].join('.');
  }
}

(() => {
  const incrementor = new VersionIncrementor();
  incrementor.bumpVersion();
})();
