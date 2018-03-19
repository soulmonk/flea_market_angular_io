'use strict';

const fs = require('fs');
const path = require('path');

const args = require('minimist')(process.argv.slice(2));

const root = path.join(__dirname, '..');
const distPath = path.join(root, 'dist');

const templatePath = path.join(root, 'dist/templates');
const input = path.join(root, '/dist/assets/index.pug');
const original = path.join(root, 'frontend/index.pug');
const output = path.join(templatePath, 'index.pug');
const watchDir = path.join(distPath, 'assets');

function createIfNotExists(path) {
  try {
    fs.statSync(path);
  } catch (err) {
    fs.mkdirSync(path);
  }
}

createIfNotExists(distPath);
createIfNotExists(templatePath);

if (args.watch) {
  console.log('Start watch parse-index');
  createWatcher();
} else {
  console.log('Start parse-index');
  parseIndex();
}

function createWatcher() {
  parseIndex(false);
  fs.watch(watchDir, (action, file) => {
    if (file === 'index.pug' && action === 'change') {
      console.log(`File changed at ${new Date()}`);
      parseIndex(false);
    }
  });
}

function parseIndex(needRemove = true) {
  const INDENT = '    ';

  let index;

  try {
    index = fs.readFileSync(input, 'UTF-8');
  } catch (err) {
    console.error(err.message);
    return;
  }
  if (needRemove) {
    try {
      fs.unlinkSync(input);
    } catch (ignore) {}
  }

  index = index.toString()
    .replace(/<(\s+)?head(\s+)?>|<(\s+)?\/(\s+)?head(\s+)?>/g, '');

  let linkPattern = /<(\s+)?link[^<>]+\/?(\s+)?>/g;

  let links = index.match(linkPattern);

  let scriptPattern = /<(\s+)?script[^<]+<(\s+)?\/(\s+)?script(\s+)?>/g;

  let scripts = index.match(scriptPattern);

  try {
    index = fs.readFileSync(original, 'UTF-8');
  } catch (err) {
    console.error(err.message);
    return;
  }

  if (!scripts) {
    scripts = [];
  }
  scripts.forEach((script, index) => {
    scripts[index] = script.replace(/<|>.+/g, '').replace(/\s/, '(') + ')';
  });

  if (!links) {
    links = [];
  }
  links.forEach((link, index) => {
    links[index] = link.replace(/<|\/(\s+)?>(.+)?/g, '')
      .replace(/\s/, '(') + ')';
  });

  if (!scripts.length && links.length) {
    return;
  }
  index = index.replace(
    /\/\/(\s+)?-?(\s+)?scripts/g, scripts.join('\n' + INDENT)
  );

  index = index.replace(/\/\/(\s+)?-?(\s+)?styles/g, links.join('\n' + INDENT));

  fs.writeFileSync(output, index);
  return index;
}

