/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 🔍
 * 🎋 Unauthorized Duplication is Prohibited 🥏
 */


const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ms = require('ms')
const fetch = require("node-fetch");
const ee = require(`${process.cwd()}/botconfig/embed.json`);

module.exports = {
    name: 'slowmode',
    aliases: ['speedchat'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {

if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`${client.emojino} **You cant use this!**`);
let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")    
        if (!args[0]) {
            const slowmodeError2 = new MessageEmbed()
            .setTitle(`${client.emojino} **Please Provide a Time!**`)
                .setDescription(`You did not provide a time. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - ${client.config.prefix}slowmode 5s)`)
                .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
            return message.channel.send({ embeds: [slowmodeError2] })
        }
        const currentSlowmode = message.channel.rateLimitPerUser
        const reason = args[1] ? args.slice(1).join(" ") : 'Not Specified'

        if (args[0] === 'off') {
            if (currentSlowmode === 0) {
                const slowmodeOfferror = new MessageEmbed()
                    .setTitle(`${client.emojino} Slowmode is already off`)
                    .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
                return message.channel.send({ embeds: [slowmodeOfferror] })
            }
            message.channel.setRateLimitPerUser(0, reason)
            const slowmodeOff = new MessageEmbed()
                .setTitle(`${client.emojiyes} Disabled The Slowmode!`)
                .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)

            return message.channel.send({ embeds: [slowmodeOff] })
        }

        const time = ms(args[0]) / 1000
        const slowmodeError3 = new MessageEmbed()
        .setTitle(`${client.emojino} Invalid Time!`)
            .setDescription(`Please write the time in the units mentioned. \n\n Time Units - h(hour), m(minute), s(seconds) \n (Example - ${client.config.prefix}slowmode 5s)`)
            .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
        if (isNaN(time)) {
            return message.channel.send({ embeds: [slowmodeError3] })
        }

        if (time > 21600000) {
            const slowmodeError4 = new MessageEmbed()
            .setTitle(`${client.emojino} Time is too High!`)
                .setDescription(`Make sure its below 6 hours.`)
                .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)

            return message.channel.send({ embeds: [slowmodeError4] })
        }

        if (currentSlowmode === time) {
            const slowmodeError5 = new MessageEmbed()
                .setTitle(`${client.emojino} Slowmode is already set to ${args[0]}`)
                .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
            return message.channel.send({ embeds: [slowmodeError5] })
        }
        
        let slowmode = await message.channel.setRateLimitPerUser(time, reason)
        let afterSlowmode = message.channel.rateLimitPerUser
        if(afterSlowmode > 0) {
            const embed = new MessageEmbed()
            .setTitle(`${client.emojiyes} Set The Slowmode to \`${args[0]}\`!`)
            .setDescription(`Reason:\n>>> ${reason}`)
            .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
            
            return message.channel.send({ embeds: [embed] })
        } else if(afterSlowmode === 0) {
            return message.channel.send({ embeds: [slowmodeError3] })
        }


    }
}

/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */