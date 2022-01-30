const {
  MessageEmbed
} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const { MessageButton } = require('discord-buttons')
module.exports = {
  name: "invite",
  category: "🔰 Info",
  aliases: ["add", "vote"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/scazJBasBM")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=933482669491240980&permissions=1099511627775&redirect_uri=https%3A%2F%2Fdiscord.gg%2FscazJBasBM&response_type=code&scope=bot%20guilds.join%20applications.commands`)
      let button_vote = new MessageButton().setStyle('url').setLabel('Vote').setURL(`https://top.gg/bot/933482669491240980/vote`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
       message.channel.send({
         embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting NOVA OFFICIAL BOT")
          .addField(`NOVA OFFICIAL`, `**[Support Server](https://discord.gg/scazJBasBM)
          **\n\n[**Invite** **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=933482669491240980&permissions=1099511627775&redirect_uri=https%3A%2F%2Fdiscord.gg%2FscazJBasBM&response_type=code&scope=bot%20guilds.join%20applications.commands)
          \n\n[**Vote**](https://top.gg/bot/933482669491240980/vote)`)
          .setFooter("NOVA OFFICAL BOT", "https://cdn.discordapp.com/attachments/897598698756915213/916647824408592404/IMG_1050.png"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`:x: An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}