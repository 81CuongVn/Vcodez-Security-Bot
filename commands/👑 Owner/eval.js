const Discord = require("discord.js");
const { Message, Client } = require("discord.js");
const config = require("../../botconfig/config")
const hastebin = require('hastebin-gen');


module.exports = {
    name: "eval",
    description: "evals a node.js code",
    run: async (client, message, args) => {
    if (!config.ownerIDS.includes(message.author.id)) return message.reply({ content: 'no you' })
    
    const code = args.join(' ');
    if(!code) return message.reply({ content: 'give me a code to eval you idiot' })
    
    String.prototype.replaceAll = function (search, replacement) {
      return this.replace(RegExp(search, 'gi'), replacement);
    }

    client.clean = text => {
      if (typeof text !== 'string') {
        text = require('util').inspect(text, { depth: 0 });
      }
      text = text
      .replace(/`/g, '`' + String.fromCharCode(8203))
      .replace(/@/g, '@' + String.fromCharCode(8203))
      .replaceAll(client.token, 'Not happening, buddy.')
      return text;
    };
    
    try {
      const evaled = client.clean(eval(code));      
      if (evaled.length < 800) {
        message.channel.send({ content: `\`\`\`xl\n${evaled}\n\`\`\`` })
      } else {
        await hastebin(evaled, "js").then(r => {
          message.channel.send({ content:   `\`\`\`xl\n${r}\n\`\`\`` })
        });
      }
    } catch (err) {
      message.channel.send({ content: `\`\`\`xl\n${err}\n\`\`\`` });
    }
    },
};
