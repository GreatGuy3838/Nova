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
  aliases: ["add"],
  usage: "invite",
  description: "Gives you an Invite link for this Bot",
  run: async (client, message, args, cmduser, text, prefix) => {
    let es = client.settings.get(message.guild.id, "embed")
    try {
      let button_support_dc = new MessageButton().setStyle('url').setLabel('Support Server').setURL("https://discord.gg/G22vGgkf5B")
      let button_invite = new MessageButton().setStyle('url').setLabel('Invite this Bot').setURL(`https://discord.com/api/oauth2/authorize?client_id=797643112302247967&permissions=8&scope=bot`)
      //array of all buttons
      const allbuttons = [button_support_dc, button_invite]
       message.channel.send({
         embed: new MessageEmbed()
          .setColor(ee.color)
          .setTitle("Thanks for inviting MYTHICBot")
          .addField(`MYTHICBot Powered by CEO│Eul Joromat#0923`, `**[Invite Public Bot](https://discord.com/api/oauth2/authorize?client_id=797643112302247967&permissions=8&scope=bot)  •  [Support Server](https://discord.gg/G22vGgkf5B)
          **\n\n[**Invite** **${client.user.username}**](https://discord.com/api/oauth2/authorize?client_id=797643112302247967&permissions=8&scope=bot)`)
          .setImage("https://share.creavite.co/GqxQErItvpLyPHWi.gif")
          .setFooter("MYTHIC Security Bot | powered by CEO│Eul Joromat#0923", "https://cdn.discordapp.com/attachments/880336519305523210/880632358364127254/2Q.png"),
        buttons: allbuttons
      });
    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.channel.send(new MessageEmbed()
        .setColor(es.wrongcolor).setFooter(es.footertext, es.footericon)
        .setTitle(`An error occurred`)
        .setDescription(`\`\`\`${String(JSON.stringify(e)).substr(0, 2000)}\`\`\``)
      );
    }
  }
}