// purgecss.config.js
const buildOutputPath = './dist/international-salary-calculator-angular';

module.exports = {
  content: [
    `${buildOutputPath}/index.html`,
    `${buildOutputPath}/*.js`
  ],
  css: [
    `${buildOutputPath}/*.css`
  ],
  defaultExtractor: (content) => content.match(/[\w-/:.]+(?<!:)/g) || [],
  output: `${buildOutputPath}/`,
};
