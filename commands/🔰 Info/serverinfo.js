const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json")
var ee = require("../../botconfig/embed.json")
const emoji = require(`../../botconfig/emojis.json`);
const moment = require("moment")
module.exports = {
  name: "serverinfo",
  aliases: ["sinfo"],
  category: "🔰 Info",
  description: "Shows info about a server",
  usage: "serverinfo",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      function trimArray(arr, maxLen = 25) {
        if (arr.array().length > maxLen) {
          const len = arr.array().length - maxLen;
          arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
          arr.map(role => `<@&${role.id}>`)
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      await message.guild.members.fetch();
      function emojitrimarray(arr, maxLen = 20) {
        if (arr.length > maxLen) {
          const len = arr.length - maxLen;
          arr = arr.slice(0, maxLen);
          arr.push(`${len} more...`);
        }
        return arr.join(", ");
      }
      let boosts = message.guild.premiumSubscriptionCount;
      var boostlevel = 0;
      if (boosts >= 2) boostlevel = "1";
      if (boosts >= 15) boostlevel = "2";
      if (boosts >= 30) boostlevel = "3 / ∞";
      let maxbitrate = 96000;
      if (boosts >= 2) maxbitrate = 128000;
      if (boosts >= 15) maxbitrate = 256000;
      if (boosts >= 30) maxbitrate = 384000;
        message.channel.send(new Discord.MessageEmbed()
        .setAuthor("Server Information About: " +  message.guild.name, message.guild.iconURL({
          dynamic: true
        }), "https://discord.gg/nSD9qV95p4")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .addField("<:emoji_13:911956334289747968> Owner", `${message.guild.owner.user}\n\`${message.guild.owner.user.tag}\``, true)
        .addField("<:emoji_13:911956334289747968> Created On", "\`" + moment(message.guild.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.guild.createdTimestamp).format("hh:mm:ss") +"`", true)
        .addField("<:emoji_13:911956334289747968> You Joined", "\`" + moment(message.member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(message.member.joinedTimestamp).format("hh:mm:ss") +"`", true)
      
        .addField("<:emoji_13:911956334289747968> All Channels", "👁‍🗨 \`" + message.guild.channels.cache.size + "\`", true)
        .addField("<:emoji_13:911956334289747968> Text Channels", "💬 \`" + message.guild.channels.cache.filter(channel => channel.type == "text").size + "\`", true)
        .addField("<:emoji_13:911956334289747968> Voice Channels", "🔈 \`" + message.guild.channels.cache.filter(channel => channel.type == "voice").size + "\`", true)
       
        .addField("<:emoji_13:911956334289747968> Total USERS", "😀 \`" + message.guild.memberCount + "\`", true)
        .addField("<:emoji_13:911956334289747968> Total HUMANS", "👤 \`" + message.guild.members.cache.filter(member => !member.user.bot).size + "\`", true)
        .addField("<:emoji_13:911956334289747968> Total BOTS", "🤖 \`" + message.guild.members.cache.filter(member => member.user.bot).size + "\`", true)
        
        .addField("<:emoji_13:911956334289747968> ONLINE", "🟢 \`" + message.guild.members.cache.filter(member => member.presence.status != "offline").size + "\`", true)
        .addField("<:emoji_13:911956334289747968> OFFLINE", ":black_circle:\`" + message.guild.members.cache.filter(member => member.presence.status == "offline").size + "\`", true)

        .addField("<:Nitro:914405310465192037> Total Boosts", "<:Nitro:914405310465192037> \`" + message.guild.premiumSubscriptionCount + "\`", true)
        .addField("<:Nitro:914405310465192037> Boost-Level", "<:Nitro:914405310465192037> \`" + boostlevel + "\`", true)
        .addField("<:emoji_13:911956334289747968> Max-Talk-Bitrate", "👾 \`" + maxbitrate + " kbps\`", true)
        
        .addField(`<:emoji_13:911956334289747968> [${message.guild.emojis.cache.size}] Emojis: `, "> "+message.guild.emojis.cache.size < 20 ? message.guild.emojis.cache.map(emoji => `${emoji}`).join(", ") : message.guild.emojis.cache.size > 20 ? emojitrimarray(message.guild.emojis.cache.map(emoji => `${emoji}`)).substr(0, 1024) : 'No Emojis')
        .addField(`<:emoji_13:911956334289747968> [${message.guild.roles.cache.size}] Roles: `, "> "+message.guild.roles.cache.size < 25 ? message.guild.roles.cache.array().sort((a, b) => b.rawPosition - a.rawPosition).map(role => `<@&${role.id}>`).join(', ') : message.guild.roles.cache.size > 25 ? trimArray(message.guild.roles.cache) : 'None')
        .setThumbnail(message.guild.iconURL({
          dynamic: true
        }))
        .setFooter("ID: " + message.guild.id, message.guild.iconURL({
          dynamic: true
        })));
     
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor)
        .setFooter(es.footertext, es.footericon)
        .setTitle(`:x: ERROR | An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}

