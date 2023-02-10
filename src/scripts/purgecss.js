const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');

// find the styles css file
const purgeCSSModulePath = './node_modules/purgecss/bin/purgecss.js';
const buildOutputPath = './dist/international-salary-calculator-angular';
const purgeCSSConfigFilePath = './purgecss.config.js';

const files = getFilesFromPath(buildOutputPath, '.css');
let data = [];

if (!files && files.length <= 0) {
  console.log('cannot find style files to purge');
  return;
}

for (let f of files) {
  // get original file size
  const originalSize = getFilesizeInKiloBytes(`${buildOutputPath}/` + f) + 'kb';
  var o = { file: f, originalSize: originalSize, newSize: '' };
  data.push(o);
}

console.log('Run PurgeCSS...');

const executeCommand = `${purgeCSSModulePath} --config ${purgeCSSConfigFilePath}`;

exec(executeCommand,
function (error, stdout, stderr) {
  console.log('PurgeCSS done');
  console.log();

  for (let d of data) {
    // get new file size
    const newSize = getFilesizeInKiloBytes(`${buildOutputPath}/` + d.file) + 'kb';
    d.newSize = newSize;
  }
  console.table(data);
});

function getFilesizeInKiloBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size / 1024;
  return fileSizeInBytes.toFixed(2);
}

function getFilesFromPath(dir, extension) {
  let files = fs.readdirSync(dir);
  return files.filter((e) => path.extname(e).toLowerCase() === extension);
}
