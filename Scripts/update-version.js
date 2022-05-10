#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

const version = process.argv[2];
if (!version) {
  console.error('No version specified');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.version = version;
fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));


glob('contracts/**/*.sol', null, function (err, files) {
  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');

    const versionStringLine = versionPrefix + version;

    let updatedContent;
    if (content.includes(versionPrefix)) {
      updatedContent = content.replace(new RegExp(`${versionPrefix}.*`), `${versionStringLine}`);
    } else {
      updatedContent = content.replace(new RegExp(`${spdxString}`), `${spdxString}\n${versionStringLine}`);
    }

    fs.writeFileSync(file, updatedContent);
  });
});
