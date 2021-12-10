const client = require("../index.js")
const db = require('quick.db');
const map = new Map();
const { MessageEmbed } = require('discord.js');
client.on('message', async (message) => {
  let es = client.settings.get(message.guild.id, "embed");
  
   if(message.member.permissions.has("ADMINISTRATOR")) 
     return;
    
 if(message.member.permissions.has("MANAGE_GUILD")) 
     return;
     if(message.member.permissions.has("MANAGE_MESSAGES")) 
     return;
     
   
   let spam = db.get(`antispam_${message.guild.id}`);

   
   
if(spam) {
    if(map.has(message.author.id)) {
        const data = map.get(message.author.id)
        const { lastmsg, timer } = data;
        const diff = message.createdTimestamp - lastmsg.createdTimestamp;
        let msgs = data.msgs
        if(diff > 2000) {
            clearTimeout(timer);
            data.msgs = 1;
            data.lastmsg = message;
            data.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, 100000)
            map.set(message.author.id, data)
        } else {
            ++msgs;
            if(parseInt(msgs) === 5) {
                const role = message.guild.roles.cache.find(r => r.name === "muted")
                message.member.roles.add(role)
                message.react(client.emojino)
                const muted = new MessageEmbed()
   .setColor(es.wrongcolor)
   .setTitle(`${client.emojiyes} Muted \`${message.author.tag}\` for \`1 Min\` due to Spam`)
   .setFooter(es.footertext, es.footericon)
                message.channel.send({ embeds: [muted] })
                setTimeout(() => {
                    message.member.roles.remove(role)
                    const unmuted = new MessageEmbed()
   .setColor(es.wrongcolor)
   .setTitle(`${client.emojiyes} The Spammer \`${message.author.tag}\` was Unmuted after \`1 Min\``)
   .setFooter(es.footertext, es.footericon)
                    message.channel.send({ embeds: [unmuted] })
                }, 100000)
            } else {
                data.msgs = msgs;
                map.set(message.author.id, data)
            }
        }
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id);
        }, 100000)
        map.set(message.author.id, {
            msgs: 1,
            lastmsg: message,
            timer: remove
        })
    }
    }
})
