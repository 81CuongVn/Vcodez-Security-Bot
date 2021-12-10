const { glob } = require("glob");
const { promisify } = require("util");
const { Client } = require("discord.js");
const mongoose = require("mongoose");
const chalk = require("chalk");
const Discord = require('discord.js');
const globPromise = promisify(glob);

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await globPromise(`${process.cwd()}/commands/**/*.js`);
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });
    
    // Events
    const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    eventFiles.map((value) => require(value));



    // mongoose
    if(!process.env.mongooseConnectionString) return;
    mongoose.connect(process.env.mongooseConnectionString, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(console.log(chalk.blue.bold("Loading Database ") + chalk.green.bold(`"Mongoose"`)))
}


