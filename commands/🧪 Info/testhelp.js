/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */

const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');

const { readdirSync } = require("fs");
const config = require(`${process.cwd()}/botconfig/config.json`);
const dashboard = require(`${process.cwd()}/dashboard/settings.json`);
const emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const ee = require(`${process.cwd()}/botconfig/embed.json`);
module.exports = {
    name: "help",
    aliases: ['h'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      let es = client.settings.get(message.guild.id, "embed");
      try {
      const db = require('quick.db')
      const prefix = client.config.prefix;
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith(".js"));

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);
          if (!file.name) return "No command name.";
          let name = file.name.replace(".js", "");
          return `\`${name}\``;
        });
        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "WIP 🚧" : cmds.join(" "),
        };

        categories.push(data);
      }); 

      const embed = new MessageEmbed()
      .setTitle(`${client.user.username}'s Help menu! Listed below are all of my commands;`)
      .setColor(es.color)
      .addFields(categories)
      .setDescription(`<:shield:912755852077846608> Try out my BETA Dashboard at: ${dashboard.website.domain}`)
      .setFooter(es.footertext, es.footericon)
      
      return message.reply({ embeds: [embed] })
    } catch(e) {
        const errorEmb = new MessageEmbed()
        .setColor("RANDOM") 
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTitle(`❌ Uh oh! An error seems to have ocurred!`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        return message.channel.send({ embeds: [errorEmb] })
      }
    },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */