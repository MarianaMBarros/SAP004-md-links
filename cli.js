#!/usr/bin/env node

const program = require('commander');
const mdLinks = require('./index');
const package = require('./package.json');

program.version(package.version);
program
  .option('-v, --validate [validate]')
  .option('-s, --stats [stats]')
  .parse(process.argv);

let path = program.args[0];

mdLinks(path, { validate: program.validate, stats: program.stats })
  .then(result => {
    if (program.validate === true && program.stats === true) {
      console.log(`Total: ${result.Total}`)
      console.log(`Unique: ${result.Unique}`)
      console.log(`Broken: ${result.Broken}`)
    } else if (program.stats === true) {
      console.log(`Total: ${result.Total}`)
      console.log(`Unique: ${result.Unique}`)
    } else {
      for (let item of result) {
        console.log(`${item.file} ${item.href} ${item.valid} ${item.statusCode} ${item.text} `)
      }
    }
  })
  .catch(error => console.log("promise rejeitada: " + error));

