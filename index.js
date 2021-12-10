const { Client, Collection } = require("discord.js");
const Discord = require('discord.js');
const colors = require("colors");
const enmap = require("enmap"); 
const fs = require("fs"); 
const client = new Discord.Client({
  fetchAllMembers: false,
  failIfNotExists: false,
  shards: "auto",
  allowedMentions: {
    parse: ["roles", "users"],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
  intents: [ 
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ]
});
module.exports = client;


/**********************************************************
 * @param {5} create_the_languages_objects to select via CODE
 *********************************************************/
client.la = { }
var langs = fs.readdirSync("./languages")
for(const lang of langs.filter(file => file.endsWith(".json"))){
  client.la[`${lang.split(".json").join("")}`] = require(`./languages/${lang}`)
}
Object.freeze(client.la)
//function "handlemsg(txt, options? = {})" is in /handlers/functions 



/**********************************************************
 * @param {6} Raise_the_Max_Listeners to 25 (default 10)
 *********************************************************/
client.setMaxListeners(25);
require('events').defaultMaxListeners = 25;

function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
}requirehandlers();
module.exports.requirehandlers = requirehandlers;

/*        GLOBAL VARIABLES          ¦¦         GLOBAL VARIABLES */
client.commands = new Collection();
client.slashCommands = new Collection();

client.aliases = new Discord.Collection();
client.categories = require("fs").readdirSync(`./commands`);
client.config = require("./botconfig/config.json");
client.emojiyes = `<a:yes_animated:911729650030510081>`; // This defines the YES emoji for the bot!
client.emojino = `<:no:897849877810274324>`; // This defines the NO emoji for the bot!

/*        WEB & BOT SERVER         ¦¦        WEB & BOT SERVER        */ 

require("./dashboard/index.js")(client);


require("./handler")(client);

client.login(process.env.token);
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */