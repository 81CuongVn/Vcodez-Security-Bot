/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const db = require('quick.db')
const warns = require("../../models/warns")
const fetch = require("node-fetch");
const moment = require('moment');

module.exports = {
    name: 'warns',
    aliases: ['punishes', 'warnings'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
    
      const user = message.mentions.users.first();
      const nouser = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please add a Member you want to see their warns!`)
      .setDescription(`Usage: \`${client.config.prefix}warns @User\``)

      
      
      if (!user) return message.reply({ embeds: [nouser] }); // go to warn.js
      
      let params = { Guild: message.guild.id, User: user.id }
      warns.findOne(params, async(err, data) => {
        const nowarns = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} \`${user.tag}\` has __No__ warnings!`)
        if(!data) return message.reply({ embeds: [nowarns] })

        const array = [];
        data.Content.map((w, i) => {
          array.push(`Warn ID: \`${i + 1}\` \nWarn Reason: **${w.reason}** \nWarned by: \`${w.moderator}\`\nWarn Date: **${w.date}**`)
        })
        
        const banmessage = new MessageEmbed()
        .setTitle(`${client.emojiyes} Warnings of: \`${user.tag}\`!`)
        .setColor(ee.color)
        .setFooter(es.footertext, es.footericon)
        .setThumbnail(user.displayAvatarURL())      
        .setDescription(array.join("\n\n"))
        message.reply({ embeds: [banmessage] })
      })
    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */