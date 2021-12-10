const client = require("../index.js")
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
client.on('message', async (message) => {
  let es = client.settings.get(message.guild.id, "embed");

  const advertize = new MessageEmbed()
  .setColor(`BLURPLE`)
  .setTitle(`${client.user.username}'s Ai-Chat`)
  .setDescription(`>>> My **[api is powered by brainshop.ai](https://brainshop.ai/)**\n<:discord:908435011882070076> Join my **[Discord Server](https://discord.gg/BRpFDt7TPr)**\n_I am made by **Masterious#2213, aledlb8#1196, and lostfqi៛#1268!**_`)
  .setFooter(es.footertext, es.footericon)

  const noping = new MessageEmbed()
  .setTitle(`${client.emojino} Dont Mention Anyone!`)
  .setColor(es.wrongcolor)
  .setFooter(es.footertext, es.footericon)
  
   const fetch = require("node-fetch");
   const channel = await db.get(`chatbot_${message.guild.id}`);
 	if(!channel) return;
 	const sChannel = message.guild.channels.cache.get(channel);
 	if (!sChannel) return;
	if (message.author.bot || sChannel.id !== message.channel.id) return;
 	message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
   if(message.content.includes(`Who made you?`)) {
   return message.reply({ embeds: [advertize] })
   }
 	if (message.content.includes(`@`)) {
 		return sChannel.send({ embeds: [noping] });
 	}
 	if (!message.content) return sChannel.send(`${client.emojino} **Please Say Something!**`);
 	fetch(`https://api.deltaa.me/chatbot?message=${encodeURIComponent(message.content)}&name=${client.user.username}&gender=Male`)
 	.then(res => res.json())
 	.then(data => {
    sChannel.sendTyping()
 		message.reply(`${data.message}`);
 	});
})
