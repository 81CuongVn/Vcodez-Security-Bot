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
    name: 'mute',
    aliases: ['silence'],
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
      .setTitle(`${client.emojino} Please add a Member you want to mute!`)
      .setDescription(`Usage: \`${client.config.prefix}mute @User [Time] [Reason]\``)
      const self = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} You cannot mute yourself!`)
      
      
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")
        if (!user) return message.reply({ embeds: [nouser] });
        const target = message.guild.members.cache.get(user.id);
        if(user.id === message.author.id) return message.reply({ embeds: [self] });
        const almuted = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} \`${user.tag}\` is already muted!`)
        if(target.roles.cache.find(r => r.name === "muted")) return message.reply({ embeds: [almuted] });
        const higher = new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot mute someone, who is above/equal you!`)
        const memberPosition = target.roles.highest.position;
      const moderationPosition = message.member.roles.highest.position;
      if (moderationPosition <= memberPosition)
        return message.reply({ embeds: [higher] })
        if(!muteerole) return message.reply("Couldn't find the Muted role.");
if (!muterole) {
                try {
                    
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };
        const reason = args.slice(2).join(" ");
        let time = args[1];
        if (!time) time = "1h";

        target.roles.add(muteerole.id);
        const embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`${client.emojiyes} Muted \`${user.tag}\` for \`${ms(ms(time))}\`!`)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED"}**`)
        const embed_dm = new MessageEmbed()
        .setTitle(`You got muted in \`${message.guild.name}\` for \`${ms(ms(time))}\` by \`${message.author.tag}\`!`)
        .setDescription(`Reason:\n>>> **${reason != "" ? reason : "NO REASON DEFINED"}**`)
        .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)

        message.reply({ embeds: [embed] });
        user.send({ embeds: [embed_dm] });
        
        setTimeout(() => {
            target.roles.remove(muteerole.id);
            const unmute = new MessageEmbed()
            .setColor(ee.color)
      .setThumbnail(user.displayAvatarURL())
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojiyes} Unmuted \`${user.tag}\` after \`${ms(ms(time))}\`!`)
      const unmute_dm = new MessageEmbed()
      .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`You got UnMuted in \`${message.guild.name}\` after \`${ms(ms(time))}\`!`)
            message.reply({ embeds: [unmute] })
            user.send({ embeds: [unmute_dm] });
        }, ms(time));

    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */