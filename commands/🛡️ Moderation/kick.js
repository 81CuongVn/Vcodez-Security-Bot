/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const fetch = require("node-fetch");
const ee = require(`${process.cwd()}/botconfig/embed.json`);

module.exports = {
    name: 'kick',
    aliases: ['tempdestroy'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {

if(!message.member.permissions.has("KICK_MEMBERS")) return message.reply(`${client.emojino} **You cant use this!**`);
let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
        const user = message.mentions.users.first();
        const nouser = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please add a Member you want to kick!`)
      .setDescription(`Usage: \`${client.config.prefix}kick @User [Reason]\``)
      const self = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} You cannot kick yourself!`)
        if (!user) return message.reply({ embeds: [nouser] });
        if(user.id === message.author.id) return message.reply({ embeds: [self] });
        const higher = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot kick someone, who is above/equal you!`)
      const target = message.guild.members.cache.get(user.id);
        const memberPosition = target.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.reply({ embeds: [higher] })
        const notable = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cant kick \`${user.tag}\`!`)
        if (!target.kickable)
        
        return message.reply({ embeds: [notable] })
        const reason = args.slice(1).join(" ");
        message.guild.members.cache.get(user.id).kick(reason);
 
        const kickmessage = new MessageEmbed()
        .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
        .setTitle(`${client.emojiyes} Kicked \`${user.tag}\`!`)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED!"}**`)
        const kickmessage_dm = new MessageEmbed()
        .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojiyes} You got Kicked in \`${message.guild.name}\` by \`${message.author.tag}\`!`)
      .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED!"}**`)
        message.channel.send({ embeds: [kickmessage] });
        user.send({ embeds: [kickmessage_dm] })

    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */