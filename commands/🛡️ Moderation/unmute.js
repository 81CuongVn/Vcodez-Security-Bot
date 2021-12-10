/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const fetch = require("node-fetch");
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const fs = require('fs');
const ms = require('ms');

module.exports = {
    name: 'unmute',
    aliases: ['unsilence'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {

if(!message.member.permissions.has("MUTE_MEMBERS")) return message.reply(`${client.emojino} **You cant use this!**`);
let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
        const user = message.mentions.users.first();
        let muterole;
        const nouser = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please add a Member you want to unmute!`)
      .setDescription(`Usage: \`${client.config.prefix}unmute @User [Reason]\``)
      const self = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} You cannot unmute yourself!`)
      const almuted = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} This user is not muted!`)
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")
        if (!user) return message.reply({ embeds: [nouser] });
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply({ embeds: [self] });
        const higher = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot unmute someone, who is above/equal you!`)
        const memberPosition = target.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.reply({ embeds: [higher] })
        if(!target.roles.cache.has(muteerole.id)) return message.reply({ embeds: [almuted] });
        if(!muteerole) return message.reply("Couldn't find the Muted role.");

        const reason = args.slice(1).join(" ");


        target.roles.remove(muteerole.id);
        const embed = new MessageEmbed()
        .setColor(ee.color)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojiyes} UnMuted \`${user.tag}\`!`)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED"}**`)
        const embed_dm = new MessageEmbed()
        .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojiyes} You got Unmuted in \`${message.guild.name}\` by \`${message.author.tag}\`!`)
      .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED"}**`)

        message.reply({ embeds: [embed] });
        user.send({ embeds: [embed_dm] })
        
        

    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */