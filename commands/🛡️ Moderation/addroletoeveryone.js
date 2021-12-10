/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */

const { MessageButton, Discord, MessageEmbed, MessageActionRow, CommandInteraction, MessageComponentInteraction, InteractionCollector, MessageCollector } = require('discord.js');
const ee = require(`${process.cwd()}/botconfig/embed.json`);
const fetch = require("node-fetch");

module.exports = {
    name: 'addroletoeveryone',
    aliases: ['addroletoall'],
    category: "🛡️ Moderation",
    run: async (client, message, args) => {
      try {
      let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")  
  
      if(!message.member.permissions.has('MANAGE_ROLES')) return message.reply(`${client.emojino} **You cant use this!**`);

      const fetchedRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[0]) || message.guild.roles.cache.find(r => r.name == args[0]);
         
      message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(fetchedRole))
      const nouser = new MessageEmbed()
        .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please mention a role to add to everyone!`)
      .setDescription(`Usage: \`${client.config.prefix}addroletoeveryone @Role or Role Name or Role ID\``)

      const higher = new MessageEmbed() 
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} I cannot give that Role to all Members, because it's higher then your highest ROLE!`)
      

      if (message.member.roles.highest.position <= fetchedRole.position)
      return message.reply({ embeds: [higher] })



                const confirmEmbed = new MessageEmbed()
                .setTitle(`<a:Loading:901917363161665587> Adding **\`${fetchedRole.name}\`** To All Members (Other than Bots)!`)
                .setColor(ee.color)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(`It might take a few mins or hours to add depending on your server size!`)
                .setTimestamp();
message.reply({ embeds: [confirmEmbed] })  

} catch(e) {
        console.log(e)
        const errorEmb = new MessageEmbed()
        .setColor("RED") 
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTitle(`❌ Uh oh! An error seems to have ocurred!`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
        return message.channel.send({ embeds: [errorEmb] })
      }
      
      } 
    }
    
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */