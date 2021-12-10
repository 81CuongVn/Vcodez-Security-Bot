/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */
const Discord = require('discord.js')
const ee = require(`${process.cwd()}/botconfig/embed.json`);
module.exports = {
  name: "enlargeemoji",
  aliases: ["enlarge"],
  category: "⚙️ Utility",
  run: async (client, message, args, prefix) => {
    let es = client.settings.get(message.guild.id, "embed");
let ls = client.settings.get(message.guild.id, "language")  
      let hasEmoteRegex = /<a?:.+:\d+>/gm
      let emoteRegex = /<:.+:(\d+)>/gm
      let animatedEmoteRegex = /<a:.+:(\d+)>/gm
      const noargs = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Provide a Emoji to Enlarge!`)

      const notemoji = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Please Provide a VALID Emoji!`)
      if(!args[0]) 
      return message.reply({ embeds: [noargs] })

      const notfound = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setThumbnail(es.thumb ? es.footericon : null)
      .setFooter(es.footertext, es.footericon)
      .setTitle(`${client.emojino} Couldnt find this emoji!`)

      

      if(!args[0].match(hasEmoteRegex))
         return message.reply({ embeds: [notemoji] })
      if (emoji = emoteRegex.exec(message)) {
         let url = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?v=1"
         let attachment = new Discord.MessageAttachment(url, "emoji.png")
         const emoji_png = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setImage("https://cdn.discordapp.com/emojis/" + emoji[1] + ".png?size=512")
      .addFields(
          { name: `<:rightarrow:901773628243316779> PNG`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.png?v=1)`, inline: true },
          { name: `<:rightarrow:901773628243316779> JPEG`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.jpeg?v=1)`, inline: true },
          { name: `<:rightarrow:901773628243316779> WEBP`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.webp?v=1)`, inline: true },
        )
      .setTitle(`${client.emojiyes} Enlarged Your Emoji!`)

      .setFooter(es.footertext, es.footericon)
         message.reply({ embeds: [emoji_png] })
      }
      else if (emoji = animatedEmoteRegex.exec(message)) {
         let url2 = "https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?size=512"
         let attachment2 = new Discord.MessageAttachment(url2, "emoji.gif")
         const emoji_gif = new Discord.MessageEmbed()
      .setColor(ee.color)
      .setImage("https://cdn.discordapp.com/emojis/" + emoji[1] + ".gif?size=512")
      .addFields(
          { name: `<:rightarrow:901773628243316779> GIF`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.gif?v=1)`, inline: true },
          { name: `<:rightarrow:901773628243316779> JPEG`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.jpeg?v=1)`, inline: true },
          { name: `<:rightarrow:901773628243316779> WEBP`, value: `[\`LINK\`](https://cdn.discordapp.com/emojis/${emoji[1]}.webp?v=1)`, inline: true },
        )
      .setTitle(`${client.emojiyes} Enlarged Your Emoji!`)

      .setFooter(es.footertext, es.footericon)
         message.reply({ embeds: [emoji_gif] });
      }
      else {
         message.reply({ embeds: [notfound] })
      }
}
}