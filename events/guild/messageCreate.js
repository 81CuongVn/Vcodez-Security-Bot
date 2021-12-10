/**
 * @INFO
 * Loading all needed File Information Parameters
 */
const config = require(`${process.cwd()}/botconfig/config.json`); //loading config file with token and prefix, and settings
const ee = require(`${process.cwd()}/botconfig/embed.json`); //Loading all embed settings like color footertext and icon ...
const Discord = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const {
  MessageEmbed
} = require("discord.js"); //this is the official discord.js wrapper for the Discord Api, which we use!
const {
  escapeRegex,
  delay,
  databasing,
  handlemsg,
  check_if_dj
} = require(`${process.cwd()}/handlers/functions`); //Loading all needed functions
//here the event starts
module.exports = async (client, message) => {
  try {
    //if the message is not in a guild (aka in dms), return aka ignore the inputs
    if (!message.guild || message.guild.available === false || !message.channel || message.webhookId) return;
    //if the channel is on partial fetch it
    if (message.channel?.partial) await message.channel.fetch().catch(() => {});
    if (message.member?.partial) await message.member.fetch().catch(() => {});
    //ensure all databases for this server/user from the databasing function
    databasing(client, message.guild.id, message.author.id)
    var not_allowed = false;
    const guild_settings = client.settings.get(message.guild.id);
    let es = guild_settings.embed;
    let ls = guild_settings.language;
    let { prefix, botchannel, unkowncmdmessage } = guild_settings;
    // if the message  author is a bot, return aka ignore the inputs
    if (message.author.bot) return;
    //if not in the database for some reason use the default prefix
    if (prefix === null) prefix = config.prefix;
    //the prefix can be a Mention of the Bot / The defined Prefix of the Bot
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    //if its not that then return
    if (!prefixRegex.test(message.content)) return;
    //now define the right prefix either ping or not ping
    const [, matchedPrefix] = message.content.match(prefixRegex);
    //CHECK PERMISSIONS
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)) return;

    //await message.channel.sendTyping();

    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.USE_EXTERNAL_EMOJIS))
      return message.reply(`❌ **I am missing the Permission to USE EXTERNAL EMOJIS**`)
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.EMBED_LINKS))
      return message.reply(`❌ **I am missing the Permission to EMBED LINKS (Sending Embeds)**`)
    if(!message.guild.me.permissions.has(Discord.Permissions.FLAGS.ADD_REACTIONS))
      return message.reply(`❌ **I am missing the Permission to ADD REACTIONS**`)


    //CHECK IF IN A BOT CHANNEL OR NOT
    if (botchannel.toString() !== "") {
      //if its not in a BotChannel, and user not an ADMINISTRATOR
      if (!botchannel.includes(message.channel.id) && !message.member.permissions.has("ADMINISTRATOR")) {
        for(const channelId of botchannel){
          let channel = message.guild.channels.cache.get(channelId);
          if(!channel){
            client.settings.remove(message.guild.id, channelId, `botchannel`)
          }
        }
        try {
          message.react(client.emojino).catch(e => { console.log(String(e).grey); });
        } catch {}
        not_allowed = true;
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`${client.emojino} This is not the Bot-Chat Channel!`)
          .setDescription(`**These channels are the bot chat-channels which you can use my cmds there:**\n> ${botchannel.map(c=>`<#${c}>`).join(", ")}`)]}
        ).then(async msg => {
          setTimeout(() => msg.delete().catch(() => {}), 5000)
        }).catch(()=>{})
      }
    }
    //create the arguments with sliceing of of the rightprefix length
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    //creating the cmd argument by shifting the args by 1
    const cmd = args.shift()?.toLowerCase();
    //if no cmd added return error
    if (cmd.length === 0) {
      if (matchedPrefix.includes(client.user.id))
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.color)
          .setTitle(`${client.emojiyes} **To see all Commands type: \`${client.config.prefix}help\`!**`)]}).catch(()=>{})
      return;
    }
    //get the command from the collection
    let command = client.commands.get(cmd);
    //if the command does not exist, try to get it by his alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    //if the command is now valid
    if (command) {

      if(command.category == "💰 Premium"){
        let premiumdata = client.premium.get("global");
        if(!premiumdata.guilds.includes(message.guild.id)){
          return message.reply({
              embeds: [
                new MessageEmbed().setColor(es.wrongcolor)
                .setTitle(client.la[ls].common.premium.title)
                .setDescription(handlemsg(client.la[ls].common.premium.description, { prefix: prefix }))
              ]
          })
        }
        
      }
      var musicData = client.musicsettings.get(message.guild.id);
      if(musicData.channel && musicData.channel == message.channel.id){
        return message.reply("❌ **Please use a Command Somewhere else!**").then(msg=>{setTimeout(()=>{try{msg.delete().catch(() => {});}catch(e){ }}, 3000)}).catch(()=>{})
      }
      if (command.length == 0) {
        if (unkowncmdmessage) {
          message.reply({embeds: [
            new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(handlemsg(client.la[ls].common.unknowncmd.title, {prefix: prefix}))
              .setDescription(handlemsg(client.la[ls].common.unknowncmd.description, {prefix: prefix}))
          ]}).then(async msg => {
            setTimeout(() => msg.delete().catch(() => {}), 5000)
          }).catch(()=>{})
        }
        //RETURN
        return;

      }
      if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
        client.cooldowns.set(command.name, new Discord.Collection());
      }
      const now = Date.now(); //get the current time
      const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
      const cooldownAmount = (command.cooldown || 1) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
      if (timestamps.has(message.author.id)) { //if the user is on cooldown
        let expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
        if (now < expirationTime) { //if he is still on cooldonw
          let timeLeft = (expirationTime - now) / 1000; //get the lefttime
          if(timeLeft < 1) timeLeft = Math.round(timeLeft)
          if(timeLeft && timeLeft != 0){
            not_allowed = true;
            return message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setTitle(handlemsg(client.la[ls].common.cooldown, {time: timeLeft.toFixed(1), commandname: command.name}))]}
            ).catch(()=>{}) //send an information message
          }
        }
      }
      timestamps.set(message.author.id, now); //if he is not on cooldown, set it to the cooldown
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); //set a timeout function with the cooldown, so it gets deleted later on again
      try {
        client.stats.inc(message.guild.id, "commands"); //counting our Database stats for SERVER
        client.stats.inc("global", "commands"); //counting our Database Stats for GLOBAL

        //if Command has specific permission return error
        if (command.memberpermissions) {
          if (!message.member.permissions.has(command.memberpermissions)) {
            not_allowed = true;
            try {
              message.react("❌").catch(()=>{})
            } catch {}
            message.reply({embeds: [new Discord.MessageEmbed()
              .setColor(es.wrongcolor)
              .setFooter(es.footertext, es.footericon)
              .setTitle(client.la[ls].common.permissions.title)
              .setDescription(`${client.la[ls].common.permissions.description}\n> \`${command.memberpermissions.join("`, ``")}\``)]}
            ).then(async msg => {
              setTimeout(() => msg.delete().catch(() => {}), 5000)
            }).catch(()=>{})
          }
        }
        
        
        //run the command with the parameters:  client, message, args, user, text, prefix,
        if (not_allowed) return;
        //Execute the Command
        command.run(client, message, args, message.member, args.join(" "), prefix);
      } catch (e) {
        console.log(e.stack ? String(e.stack).grey : String(e).grey)
        return message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(client.la[ls].common.somethingwentwrong)
          .setDescription(`\`\`\`${e.message ? e.message : e.stack ? String(e.stack).grey.substr(0, 2000) : String(e).grey.substr(0, 2000)}\`\`\``)]
        }).then(async msg => {
          setTimeout(() => msg.delete().catch(() => {}), 5000)
        }).catch(()=>{});
      }
    } else {
      if (unkowncmdmessage) {
        message.reply({embeds: [new Discord.MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(handlemsg(client.la[ls].common.unknowncmd.title, {prefix: prefix}))
          .setDescription(handlemsg(client.la[ls].common.unknowncmd.description, {prefix: prefix}))]
        }).then(async msg => {
          setTimeout(() => msg.delete().catch(() => {}), 5000)
        }).catch(()=>{});
      }
    return
  }
  } catch (e) {
    console.log(e.stack ? String(e.stack).grey : String(e).grey)
    return message.reply({embeds: [
      new MessageEmbed()
      .setColor("RED")
      .setTitle("❌ An error occurred")
      .setDescription(`\`\`\`${e.message ? e.message : String(e).grey.substr(0, 2000)}\`\`\``)
    ]}).catch(()=>{})
  }
}
/**
 * @INFO
 * Bot Coded by Tomato#6966 | https://discord.gg/milrato
 * @INFO
 * Work for Milrato Development | https://milrato.dev
 * @INFO
 * Please mention him / Milrato Development, when using this Code!
 * @INFO
 */