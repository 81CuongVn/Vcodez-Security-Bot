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
  name: "setup-antiword",
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
            value: "View List",
            label: `View All Anti-Words`,
            description: `View The Current Anti-Word(s)`,
            emoji: "📃"
          },
          {
            value: "Add Word",
            label: `Add a word`,
            description: `Add a word to the Blacklist`,
            emoji: `${client.emojiyes}`
          },
          {
            value: "Delete Word",
            label: `Delete a word`,
            description: `Delete a word from the Blacklist`,
            emoji: `${client.emojino}`
          },
          {
            value: "Cancel",
            description: `Cancel and stop the Antiword-Setup!`,
            emoji: "862306766338523166"
          }
        ]
        //define the selection
        let Selection = new MessageSelectMenu()
          .setCustomId('MenuSelection')
          .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
          .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
          .setPlaceholder('Click me to setup the Anti-words')
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
          .setAuthor('Setup-Antiword', 'https://images-ext-2.discordapp.net/external/wPmxOtwWoOvKpD6EtXuNO0y95tq3_1Y6Q50DSHMU9Gc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/291/stop-sign_1f6d1.png', 'https://discord.gg/milrato')
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
          case "View List": {
             let database = db.get(`anitbadwords_${message.guild.id}`);
             const nan = new MessageEmbed()
             .setTitle(`${client.emojino} I couldnt find any Anti-Words in the Blacklist!`)
             .setColor(es.wrongcolor)
             .setFooter(es.footertext, es.footericon)
             if(!database) return message.reply({ embeds: [nan] })
        if (database && database.length) {
            let array = [];
            database.forEach((m) => {
                array.push(`**Word: \`${m.swearword}\` ︲ Word Author: \`${m.author}\`**`);
            });
            let tempmsg = await message.reply({
              embeds: [new MessageEmbed()
                .setTitle(`${client.emojiyes} Anti-Words for ${message.guild.name}`)
                .setColor(es.color)
                .setDescription(`${array.join('\n')}`)
                .setFooter(es.footertext, es.footericon)
                
              ]
            })
            
              }
          }
          break;
        case "Add Word": {
          second_layer()
          async function second_layer() {
            let anitswear = db.get(`anitbadwords_${message.guild.id}`);
            //define the embed
            var MenuEmbed = new MessageEmbed()
          .setColor(es.color)
          .setAuthor('Setup-Antiword', 'https://images-ext-2.discordapp.net/external/wPmxOtwWoOvKpD6EtXuNO0y95tq3_1Y6Q50DSHMU9Gc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/291/stop-sign_1f6d1.png', 'https://discord.gg/milrato')
          .setDescription(`***Please provide a Word to blacklist!***`)
            //send the menu msg
            let tempmsg = await message.reply({
              embeds: [MenuEmbed]
            })
            await tempmsg.channel.awaitMessages({
                filter: m => m.author.id == cmduser.id,
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(async collected => {
                const msg = collected.first().content.toLowerCase();
                if (anitswear && anitswear.find((find) => find.swearword == msg.toLowerCase())) {
                  const exist = new MessageEmbed()
                  .setColor(es.wrongcolor)
                  .setTitle(`${client.emojino} That word already exists on the Blacklist!`)
                  return message.reply({ embeds: [exist] })
                }
      let data = {
            swearword: msg,
            author: message.author.tag,
        };
        db.push(`anitbadwords_${message.guild.id}`, data);
        const added = new MessageEmbed()
        .setColor(es.color)
        .setTitle(`${client.emojiyes} ${msg} Has been added to the Blacklist!`)
        .setFooter(es.footertext, es.footericon)
        return message.reply({ embeds: [added] })
        })
        

          }
        }
        break;
        case "Delete Word": {
          let anitswear = db.get(`anitbadwords_${message.guild.id}`);
            //define the embed
            var MenuEmbed = new MessageEmbed()
          .setColor(es.color)
          .setAuthor('Setup-Antiword', 'https://images-ext-2.discordapp.net/external/wPmxOtwWoOvKpD6EtXuNO0y95tq3_1Y6Q50DSHMU9Gc/https/emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/joypixels/291/stop-sign_1f6d1.png', 'https://discord.gg/milrato')
          .setDescription(`***Please provide a Word to delete from blacklist!***`)
            //send the menu msg
            let tempmsg = await message.reply({
              embeds: [MenuEmbed]
            })
            await tempmsg.channel.awaitMessages({
                filter: m => m.author.id == cmduser.id,
                max: 1,
                time: 90000,
                errors: ["time"]
              })
              .then(async collected => {
                const msg = collected.first().content.toLowerCase();
                let database = db.get(`anitbadwords_${message.guild.id}`);

        if (database) {
            let data = database.find((x) => x.swearword === msg.toLowerCase());
            const nan = new MessageEmbed()
            .setTitle(`${client.emojino} I am unable to find that word!`)
            .setFooter(es.footertext, es.footericon)
            .setColor(es.wrongcolor)

             if (!data) return message.reply({ embeds: [nan] })
      
        let value = database.indexOf(data);
            delete database[value];

            var filter = database.filter((x) => {
                return x != null && x != '';
            });

            db.set(`anitbadwords_${message.guild.id}`, filter);

        const added = new MessageEmbed()
        .setColor(es.color)
        .setTitle(`${client.emojiyes} ${msg} Has been deleted from the Blacklist!`)
        .setFooter(es.footertext, es.footericon)
        return message.reply({ embeds: [added] })
        } else {
          const elsenan = new MessageEmbed()
            .setTitle(`${client.emojino} I am unable to find that word!`)
            .setFooter(es.footertext, es.footericon)
            .setColor(es.wrongcolor)

            return message.reply({ embeds: [elsenan] })
        

          }
              })
        }
        
        break;

        }
      }
  },
};
/**
 *  🎒 Axontic Beta ● Vcodez Development 🧪
 * 🎨 @Masterious#2218 ¦ @lostfaye ៛#1268 ¦ @aledlb8#1196 🔍
 *  🎋 Unauthorized Duplication is Prohibited 🥏
 */