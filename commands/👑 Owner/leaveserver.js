const {
  MessageEmbed
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
module.exports = {
  name: `leaveserver`,
  type: "info",
  category: `👑 Owner`,
  aliases: [`serverleave`, "kickbot"],
  description: `Make the Bot Leave a specific Server`,
  usage: `leaveserver <GUILDID>`,
  run: async (client, message, args, cmduser, text, prefix) => {
    
    let es = client.settings.get(message.guild.id, "embed");let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.includes(message.author.id))
      return message.channel.send({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable1"]))
      ]});
    if (!args[0])
      return message.channel.send({embeds :[new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(client.user.username, es.footericon)
        .setTitle(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable2"]))
        .setDescription(eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable3"]))
      ]});
    let guild = client.guilds.cache.get(args[0]);
    if(!guild) return message.reply({content : eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable4"])})
    guild.leave().then(g=>{
      message.channel.send({content : eval(client.la[ls]["cmds"]["owner"]["leaveserver"]["variable5"])})
    }).catch(e=>{
      message.reply(`${e.message ? e.message : e}`, {code: "js"})
    })
  },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */
