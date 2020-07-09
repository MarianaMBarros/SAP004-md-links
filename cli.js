#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./index');
const package = require('./package.json');

program.version(package.version);

// program
//   // .command('md [path]')
//   .description('Adiciona um path')
//   .option('--validate [validate]')
//   .action((path, options) => {
//     console.log(path, options);
//     // mdLinks(path, { validate: options.validate })
//     //   .then(result => console.log(result))
//     //   .catch(error => console.log("promise rejeitada: " + error));
//   });


program
  .option('-v, --validate [validate]')
  .option('-s, --stats [stats]')
  .parse(process.argv);


let path = program.args[0];

mdLinks(path, { validate: program.validate, stats: program.stats })
  .then(result => console.log(result))
  .catch(error => console.log("promise rejeitada: " + error));


