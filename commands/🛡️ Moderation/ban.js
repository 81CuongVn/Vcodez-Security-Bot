/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const fetch = require("node-fetch");

module.exports = {
    name: 'ban',
    aliases: ['destroy'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {

if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply(`${client.emojino} **You cant use this!**`);
let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
        const user = message.mentions.users.first();
        const nouser = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please add a Member you want to ban!`)
      .setDescription(`Usage: \`${client.config.prefix}ban @User [Reason]\``)
      const self = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} You cannot ban yourself!`)
        if (!user) return message.reply({ embeds: [nouser] });
        if(user.id === message.author.id) return message.reply({ embeds: [self] });
        const higher = new MessageEmbed() // Check role position
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot ban someone, who is above/equal you!`)
      const target = message.guild.members.cache.get(user.id);
        const memberPosition = target.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.reply({ embeds: [higher] }) // end of check role position
        const notable = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cant ban \`${user.tag}\`!`)
        if (!target.bannable)
        
        return message.reply({ embeds: [notable] })
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).ban({reason: reason});

        const banmessage = new MessageEmbed()
        .setColor(ee.color)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)
        .setTitle(`${client.emojiyes} Banned \`${user.tag}\`!`)
        .setImage(`https://i.imgur.com/O3DHIA5.gif`)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED!"}**`)
        const banmessage_dm = new MessageEmbed()
        .setTitle(`${client.emojiyes} You were banned in \`${message.guild.name}\` by \`${message.author.tag}\`!`)
        .setImage(`https://i.imgur.com/O3DHIA5.gif`)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED!"}**`)
        .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      
        message.channel.send({ embeds: [banmessage] });
        user.send({ embeds: [banmessage_dm] })

    }
}
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */