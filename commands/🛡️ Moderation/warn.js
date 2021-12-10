/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const warns = require("../../models/warns")
const db = require("../../models/warns")
const fetch = require("node-fetch");
const moment = require('moment');
const time = moment().format('MMMM Do YYYY');

module.exports = {
    name: 'warn',
    aliases: ['punish'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {
      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply(`${client.emojino} **You cant use this!**`);
      
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
      
        
      const user = message.mentions.users.first();
      const nouser = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please add a Member you want to warn!`)
      .setDescription(`Usage: \`${client.config.prefix}warn @User [Reason]\``)
      const self = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} You cannot warn yourself!`)
      
      if (!user) return message.reply({ embeds: [nouser] });
      if(user.id === message.author.id) return message.reply({ embeds: [self] });
      const higher = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot warn someone, who is above/equal you!`)
      const target = message.guild.members.cache.get(user.id);
        const memberPosition = target.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.reply({ embeds: [higher] })
      let reason = args.slice(1).join(" ");
      if(!reason) reason = "NO REASON DEFINED"

      let params = { Guild: message.guild.id, User: user.id }
      
      warns.findOne(params, async(err, data) => {
        if(!data) {
          data = new db({
            Guild: message.guild.id,
            User: user.id,
            Content: [
              {
                moderator : message.author.tag,
                reason : reason,
                date : time
              }
            ]
          })
        } else {
          const obj = {
            moderator : message.author.tag,
            reason : reason,
            date : time
          }
          data.Content.push(obj)
        }
        data.save()

      const banmessage = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)    
      .setTitle(`${client.emojiyes} Warned \`${user.tag}\`!`)
      .setDescription(`Reason:\n>>> **${reason}**`)
      
      const banmessage_dm = new MessageEmbed()
      .setTitle(`${client.emojiyes} You were warned in \`${message.guild.name}\` by \`${message.author.tag}\`!`)
      .setDescription(`Reason:\n>>> **${reason}**`)
      .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      message.reply({ embeds: [banmessage] });
      user.send({ embeds: [banmessage_dm] })
      });
    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */