#!/usr/bin/env node

var command = require('./src/command');

var helpStr = `
 note [command]
   
   where <command> can be build serve
`

var args = process.argv.slice(2);
console.log(args);
cmdStr = args.shift();
console.log(cmdStr);
if (cmdStr in command) {
  command[cmdStr]();
} else {
  console.log('command "%s" not find.', cmdStr);
}