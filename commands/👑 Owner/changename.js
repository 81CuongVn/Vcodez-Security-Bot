var {
  MessageEmbed
} = require(`discord.js`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
var config = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
  name: "changename",
  category: "👑 Owner",
  type: "bot",
  aliases: ["changebotname", "botname"],
  cooldown: 5,
  usage: "changename <NEW BOT NAME>",
  description: "Changes the Name of the BOT",
  run: async (client, message, args, cmduser, text, prefix) => {

    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language")
    if (!config.ownerIDS.some(r => r.includes(message.author.id)))
      return message.channel.send({
        embeds: [new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable1"]))
          .setDescription(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable2"]))
        ]
      });
      if (!args[0])
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable3"]))
            .setDescription(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable4"]))
          ]
        });

      if (args.join(" ").length > 32)
        return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable5"]))
          ]
        });
      client.user.setUsername(args.join(" "))
        .then(user => {
          return message.channel.send({
            embeds: [new MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable6"]))
            ]
          });
        })
        .catch(e => {
          return message.channel.send({
            embeds: [new MessageEmbed()
              .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
              .setTitle(client.la[ls].common.erroroccur)
              .setDescription(eval(client.la[ls]["cmds"]["owner"]["changename"]["variable7"]))
            ]
          });
        });
  },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */