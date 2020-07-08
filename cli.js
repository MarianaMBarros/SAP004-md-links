#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./index');
const package = require('./package.json');

program.version(package.version);

program
  .command('add [todo]')
  .description('Adiciona um to-do')
  .option('--validate [validate]')
  .action((path, options) => {
    console.log(options.validate);
    mdLinks(path, { validate: options.validate })
      .then(result => console.log(result))
      .catch(error => console.log("promise rejeitada: " + error));
  });

program.parse(process.argv);
