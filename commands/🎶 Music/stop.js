const Discord = require(`discord.js`);
const {
  MessageEmbed
} = require(`discord.js`);
const config = require(`../../botconfig/config.json`);
var ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);const {
  format,
  delay,
  edit_request_message_track_info,
  arrayMove
} = require("../../handlers/functions")
module.exports = {
  name: `stop`,
  category: `🎶 Music`,
  aliases: [`leave`, "dis", "disconnect"],
  description: `Stops current track and leaves the channel`,
  usage: `stop`,
  parameters: {"type":"music", "activeplayer": true, "previoussong": false},
  run: async (client, message, args, cmduser, text, prefix, player) => {
    let es = client.settings.get(message.guild.id, "embed")
        if(!client.settings.get(message.guild.id, "MUSIC")){
          return message.channel.send(new MessageEmbed()
            .setColor(es.wrongcolor)
            .setFooter(es.footertext, es.footericon)
            .setTitle(`<:no:833101993668771842> THIS COMMAND IS CURRENTLY DISABLED`)
            .setDescription(`An Admin can enable it with: \`${prefix}setup-commands\``)
          );
        }
    try{
      //if there is no current track error
      if (!player)
      return message.channel.send(new MessageEmbed()
        .setFooter(es.footertext, es.footericon)
        .setColor(es.wrongcolor)
        .setTitle(`<:no:833101993668771842> No song is currently playing in this guild.`)
      );
      if (player.queue && !player.queue.current)
        return message.channel.send(new MessageEmbed()
          .setFooter(es.footertext, es.footericon)
          .setColor(es.wrongcolor)
          .setTitle(`<:no:833101993668771842> No song is currently playing in this guild.`)
        );
        
      //stop playing
      player.destroy();
      //send success message
      return message.channel.send(new MessageEmbed()
        .setTitle(`<a:yes:833101995723194437> ${emoji.msg.stop} Stopped and left your Channel`)
        .addField("Thank you for using our service!",`Come join our [support server](https://discord.gg/scazJBasBM) to get information about updates, issues and for discussions about bot features!`)
        .setImage("https://cdn.discordapp.com/attachments/875692237751742474/880633325235085363/standard_1.gif")
        .setColor(es.color).setThumbnail(es.thumb ? es.footericon : null)
        .setFooter(es.footertext, es.footericon)
      );
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
          .setColor(es.wrongcolor)
          .setFooter(es.footertext, es.footericon)
          .setTitle(`<:no:833101993668771842> An error occurred`)
          .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
};
