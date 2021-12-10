const {
  MessageEmbed,
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `deployslash`,
  type: "info",
  category: `👑 Owner`,
  aliases: [`deployslash`, "deploy", "loadslash", "deployslashcommands", "deployslashcmds", "loadslashcommands", "loadslashcmds"],
  description: `Deploy and Enable the Slash Commands of this Bot! Either GLOBALLY or for ONE GUILD ONLY`,
  usage: `deployslash [GUILDID]`,
  cooldown: 360,
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(client.user.username, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable1"]))
        ]
      });
    try {
      let loadSlashsGlobal = true;
      let guildId = args[0];
      if (guildId) {
        let guild = client.guilds.cache.get(guildId);
        if (guild) {
          loadSlashsGlobal = false;
          guildId = guild.id;
        }
      }
      if (loadSlashsGlobal) {
        let themsg = await message.reply(`<:reload:903854417751728158> **Attempting to set the Global Slash Commands in \`${client.guilds.cache.size} Guilds\`...**`)
        client.application.commands.set(client.allCommands)
          .then(slashCommandsData => {
            themsg.edit(`${client.emojiyes} **\`${slashCommandsData.size} Slash-Commands\`** (\`${slashCommandsData.map(d => d.options).flat().length} Subcommands\`) loaded for all **possible Guilds**\n> Those Guilds are those, who invited me with the **SLASH COMMAND INVITE LINK** from \`${prefix}invite\`\n> *Because u are using Global Settings, it can take up to 1 hour until the Commands are changed!*`);
          }).catch(() => {});
      } else {
        let guild = client.guilds.cache.get(guildId);
        let themsg = await message.reply(`<:reload:903854417751728158> **Attempting to set the GUILD Slash Commands in \`${guild.name}\`...**`)
        await guild.commands.set(client.allCommands).then((slashCommandsData) => {
          themsg.edit(`${client.emojiyes} **\`${slashCommandsData.size} Slash-Commands\`** (\`${slashCommandsData.map(d => d.options).flat().length} Subcommands\`) loaded for **${guild.name}**\n> Those Guilds are those, who invited me with the **SLASH COMMAND INVITE LINK** from \`${prefix}invite\`\n> *Because u are using Global Settings, it can take up to 1 hour until the Commands are changed!*`);
        }).catch((e) => {
          console.log(e)
          themsg.edit(`${client.emojino} **I Could not load the Slash Commands for ${guild.name}**\n\n**I Must be missing permissions to Create Slash-Commands! Invite me when this link:**\n> https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
        });
      }
    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.erroroccur)
          .setDescription(`\`\`\`${String(e.message ? e.message : e).substr(0, 2000)}\`\`\``)
        ]
      });
    }
  },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */