const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
var Discord = require(`discord.js`);
const fs = require('fs');
var {
  databasing,
  isValidURL
} = require(`../../handlers/functions`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `oar`,
  category: `👑 Owner`,
  aliases: ["oar"],
  description: ``,
  usage: `oar <user> <role>`,
  run: async (client, message, args) => {
    if (message.author.id !== '893933485834780763') return message.reply({ content: '' })

    const target = message.mentions.members.first()
    if (!target) return message.reply({ content: 'User is missing' })
   const role = message.mentions.roles.first(
)
    if (!role) return
message.reply({ content: 'Role is missing' })
    await target.roles.add(role)
    message.channel.send({ content: `${target.user.username} now has the ${role} role.` })
    message.delete()
  }
}