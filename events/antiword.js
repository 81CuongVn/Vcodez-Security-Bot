const client = require("../index.js")
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');

client.on('message', async (message) => {
  let es = client.settings.get(message.guild.id, "embed")
  
  if(message.member.permissions.has("ADMINISTRATOR")) return
  if(message.member.permissions.has("MANAGE_GUILD")) return
  if(message.member.permissions.has("MANAGE_MESSAGES")) return
     
  let database = db.get(`anitbadwords_${message.guild.id}`);
  database.forEach((m) => {
    if(message.content.toLowerCase().includes(m.swearword)) {
      const embed = new MessageEmbed()
      .setColor(es.wrongcolor)
      .setTitle(`${client.emojino} You are not allowed to say ${m.swearword}!`)

      message.delete()
      const warn = message.channel.send({ content: `${message.author}`, embeds: [embed] })
      setTimeout(() => {
        warn.delete();
      }, 1000 * 4.3);
    }
  })
})
