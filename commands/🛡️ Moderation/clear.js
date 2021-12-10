/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */

const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const fetch = require("node-fetch");

module.exports = {
    name: 'clear',
    aliases: ['purge'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply(`${client.emojino} **You cant use this!**`);
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
      const purged = new MessageEmbed()
      .setTitle(`${client.emojiyes} ${args[0]} messages successfuly deleted!`)
      .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      const much = new MessageEmbed()
      .setTitle(`${client.emojino} You cant delete more than 100 messages at a time!`)
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      const nomention = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Provide a Number to purge!`)
      const nan = new MessageEmbed()
      .setTitle(`${client.emojino} Please provide a Valid number to purge!`)
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      try {
        let delamount = args[0];
        if(!delamount) return message.reply({ embeds: [nomention] })

            if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply({ embeds: [nan] })

            if (parseInt(delamount) > 99) return message.reply({ embeds: [much] })

            await message.channel.bulkDelete(parseInt(delamount) + 1, true);

            await message.reply({ embeds: [purged] }).then(m => {
                setTimeout(() => {
                    m.delete()
                }, 5000) // 5 seconds
            })
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
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */