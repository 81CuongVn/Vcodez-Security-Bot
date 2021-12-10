const { Message, Client, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "invite",
    aliases: ['inv', 'support', 'add'],
    category: "🔰 Info",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      const invite = new MessageEmbed()
      .setTitle(`Invite: **__${client.user.tag}__**`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
      .setDescription(`||[_Click here for an Invitelink without Admin Perms_](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=0&scope=bot)||`)
      .setFooter(message.guild.name, message.guild.iconURL())
      .setColor(`#0x2f3136`)

const row = new MessageActionRow()
.addComponents(
      new MessageButton()
      .setStyle('LINK')
      .setLabel('Invite Public Bot')
      .setURL("https://dev.vcodez.net"),

      new MessageButton()
      .setStyle('LINK')
      .setLabel('Support Server')
      .setURL("https://discord.gg/dmb2ScQRpw"),

      new MessageButton()
      .setStyle('LINK')
      .setLabel(`Invite ${client.user.username}`)
      .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`) // put the invite here
)


      message.channel.send({ embeds: [invite], components: [row] })
    }
}
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */