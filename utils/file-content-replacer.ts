// import * as _replace from 'replace-in-file';

// // Fix types
// const replace = (_replace as unknown) as (config: _replace.ReplaceInFileConfig) => Promise<_replace.ReplaceResult[]>;

// const options: _replace.ReplaceInFileConfig = {
//   files: ['dist/common-ui-lib/**'],
//   from: [/url\("\/assets/gi, /url\(\/assets/gi],
//   to: ['url("~node_modules/@iras/irin3-internal/assets', 'url(~node_modules/@iras/irin3-internal/assets'],
//   countMatches: true,
// };
// (async (config) => {
//   try {
//     const results = await replace(config);
//     const changes = results.filter((result) => result.hasChanged);
//     console.log('Replacement results:', changes);
//   } catch (error) {
//     console.error('Error occurred:', error);
//   }
// })(options);
