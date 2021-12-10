const {
  MessageEmbed, Permissions
} = require("discord.js");
const config = require(`${process.cwd()}/botconfig/config.json`);
const moment = require("moment");
const {
  databasing
} = require(`${process.cwd()}/handlers/functions`);
module.exports = client => {

  process.on('unhandledRejection', (reason, p) => {
    console.log('\n\n\n\n\n=== unhandled Rejection ==='.toUpperCase().yellow.dim);
    console.log('Reason: ', reason.stack ? String(reason.stack).gray : String(reason).gray);
    console.log('=== unhandled Rejection ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on("uncaughtException", (err, origin) => {
    console.log('\n\n\n\n\n\n=== uncaught Exception ==='.toUpperCase().yellow.dim);
    console.log('Exception: ', err.stack ? err.stack : err)
    console.log('=== uncaught Exception ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  })
  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=== uncaught Exception Monitor ==='.toUpperCase().yellow.dim);
  });
  process.on('beforeExit', (code) => {
    console.log('\n\n\n\n\n=== before Exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== before Exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('exit', (code) => {
    console.log('\n\n\n\n\n=== exit ==='.toUpperCase().yellow.dim);
    console.log('Code: ', code);
    console.log('=== exit ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('\n\n\n\n\n=== multiple Resolves ==='.toUpperCase().yellow.dim);
    console.log(type, promise, reason);
    console.log('=== multiple Resolves ===\n\n\n\n\n'.toUpperCase().yellow.dim);
  });

  client.logger = (data) => {
    if(!config[`debug-logs`]) return;
    let logstring = `${String(`Axontic-Logs`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` [::] `.magenta}`
    if(typeof data == "string"){
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if(typeof data == "object"){
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if(typeof data == "boolean"){
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    } 
  }


  
}