var {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require(`discord.js`);
var config = require(`${process.cwd()}/botconfig/config.json`);
var emoji = require(`${process.cwd()}/botconfig/emojis.json`);
const fs = require('fs');
const db = require('quick.db');
var {
  isValidURL
} = require(`${process.cwd()}/handlers/functions`);
const moment = require("moment")
module.exports = {
  name: "setup-antispam",
  category: "🔎 Setup",
  memberpermissions: ["ADMINISTRATOR"],
  type: "bot",
  aliases: [],
  cooldown: 5,
  usage: "changestatus  -->  Follow the Steps",
  description: "Changes the Status of the BOT",
  run: async (client, message, args, cmduser, text, prefix) => {

    let es = client.settings.get(message.guild.id, "embed");
    let ls = client.settings.get(message.guild.id, "language")
    
      first_layer()
      async function first_layer() {
        let menuoptions = [{
            value: "Enable",
            label: `Setup Anti-Spam`,
            description: `Enable and limit the allowed messages / 5 seconds`,
            emoji: `${client.emojiyes}`
          },
          {
            value: "Disable",
            label: `Disable Anti-Spam`,
            description: `Disables the Anti-Spam module`,
            emoji: `${client.emojino}`
          },
          {
            value: "Setting",
            label: "Anti-Spam Settings",
            description: `View the Anti-Spam settings`,
            emoji: `📑`
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Anti-Spam-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        //define the selection
        let Selection = new MessageSelectMenu()
          .setCustomId('MenuSelection')
          .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
          .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
          .setPlaceholder('Click me to setup the Anti-Spam-System')
          .addOptions(
            menuoptions.map(option => {
              let Obj = {
                label: option.label ? option.label.substr(0, 50) : option.value.substr(0, 50),
                value: option.value.substr(0, 50),
                description: option.description.substr(0, 50),
              }
              if (option.emoji) Obj.emoji = option.emoji;
              return Obj;
            }))

        //define the embed
        let MenuEmbed = new MessageEmbed()
          .setColor(es.color)
          .setAuthor('Setup-Antispam', 'https://images-ext-1.discordapp.net/external/xnkznZap6-lvqmcfuaGj0j2DdNZYcUwJgn169jFgmks/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/a-button-blood-type_1f170-fe0f.png')
          .setDescription(`***Select what you need in the \`Selection\` down below***`)
        //send the menu msg
        let menumsg = await message.reply({
          embeds: [MenuEmbed],
          components: [new MessageActionRow().addComponents(Selection)]
        })
        //Create the collector
        const collector = menumsg.createMessageComponentCollector({
          filter: i => i.isSelectMenu() && i.message.author.id == client.user.id && i.user,
          time: 90000
        })
        //Menu Collections
        collector.on('collect', menu => {
          if (menu.user.id === cmduser.id) {
            collector.stop();
            if (menu.values[0] == "Cancel") return menu.reply(`${client.emojino} Cancelled the Process`)
            menu.deferUpdate();
            handle_the_picks(menu.values[0])
          } else menu.reply({
            content: `${client.emojino} You are not allowed to do that! Only: <@${cmduser.id}>`,
            ephemeral: true
          });
        });
        //Once the Collections ended edit the menu message
        collector.on('end', collected => {
          menumsg.edit({
            embeds: [menumsg.embeds[0].setDescription(`~~${menumsg.embeds[0].description}~~`)],
            components: [],
            content: `${collected && collected.first() && collected.first().values ? `${client.emojiyes} **Selected: \`${collected ? collected.first().values[0] : "Nothing"}\`**` : `${client.emojino} **NOTHING SELECTED - CANCELLED**` }`
          })
        });
      }

      async function handle_the_picks(optionhandletype) {
        switch (optionhandletype) {
          case "Enable": {
          second_layer()
          async function second_layer() {
            const chat = db.fetch(`antispam_${message.guild.id}`);
            
            const already = new MessageEmbed()
            .setTitle(`${client.emojino} The Anti-Spam module is already setup!`)
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)

            if(chat) return message.reply({ embeds: [already] })
            
                
        db.set(`antispam_${message.guild.id}`, `Enabled`);
        const added = new MessageEmbed()
        .setColor(es.color)
        .setTitle(`${client.emojiyes} The Anti-Spam is now enabled for ${message.guild.name}!`)
        .setFooter(es.footertext, es.footericon)
        .setDescription(`**Allowed Messages / 5 Seconds: \`5\`**\n\n**Punishment: MUTE**`)
        
        return message.reply({ embeds: [added] })
        }
        

          
        }
        break;
        case "Disable": {
            //define the embed
            var MenuEmbed = new MessageEmbed()
          .setColor(es.color)
          .setTitle(`${client.emojiyes} Disabled the Anti-Spam`)
          .setFooter(es.footertext, es.footericon)
          .setDescription(`I will not mute users if they spam anymore`)
          
            //send the menu msg
            db.delete(`antispam_${message.guild.id}`)
            let tempmsg = await message.reply({
              embeds: [MenuEmbed]
            })
            
          
        }
        
        break;
        case "Setting": {
          const chat = db.fetch(`antispam_${message.guild.id}`);

          const embed_true = new MessageEmbed()
          .setColor(es.color)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`📑 Settings of the Anti-Spam`)
          .setDescription(`**Status:** ${client.emojiyes} \`Enabled\`\n\n**Allowed Messages / 5 Seconds: \`5\`**`)

          if(chat) return message.reply({ embeds: [embed_true] })

          const embed_false = new MessageEmbed()
          .setColor(es.color)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`📑 Settings of the Anti-Spam`)
          .setDescription(`**Status:** ${client.emojino} \`Disabled\`\n\n**Allowed Messages / 5 Seconds: \`5\`**`)

          if(!chat) return message.reply({ embeds: [embed_false] })
        }

        }
      }
  },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */