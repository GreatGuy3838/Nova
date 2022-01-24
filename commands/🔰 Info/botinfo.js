const Discord = require("discord.js");
const { MessageButton } = require('discord-buttons')

let os = require("os");

let cpuStat = require("cpu-stat");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const emoji = require(`../../botconfig/emojis.json`);
const {
    duration
} = require("../../handlers/functions")
module.exports = {
    name: "botinfo",
    aliases: ["info"],
    category: "🔰 Info",
    description: "Sends detailed info about the client",
    usage: "botinfo",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            cpuStat.usagePercent(function (e, percent, seconds) {
                if (e) {
                    return console.log(String(e.stack).red);
                }
                let connectedchannelsamount = 0;
                let guilds = client.guilds.cache.map((guild) => guild);
                for (let i = 0; i < guilds.length; i++) {
                    if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
                }
                if (connectedchannelsamount > client.guilds.cache.size) connectedchannelsamount = client.guilds.cache.size;
                //info
                const botinfo = new Discord.MessageEmbed()
                    .setAuthor(client.user.username, client.user.displayAvatarURL())
                    .setTitle("__**BOTINFO**__")
                    .setColor(ee.color)
                    .addField("📁 Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``)
                    .addField("<:UptimeLogo:913596674474115102> Uptime ", `\`${duration(client.uptime)}\``)
                    .addField("👤 Users", `\`Total: ${client.users.cache.size} Users\``)
                    .addField("<:Application:914361534745022474> Servers", `\`Total: ${client.guilds.cache.size} Servers\``)
                    .addField("🎙️ Voice-Channels", `\`${client.channels.cache.filter((ch) => ch.type === "voice").size}\``)
                    .addField("<:cool:863399662693777418> Connected Channels", `\`${connectedchannelsamount}\``)
                    .addField("<:Discordjs:916941415265738753> Discord.js", `\`v${Discord.version}\``)
                    .addField("<:Nodejs:916947272250581052> Node", `\`${process.version}\``)
                    .addField("🤖 CPU", `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``)
                    .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``)
                    .addField("🤖 Arch", `\`${os.arch()}\``)
                    .addField("<:CrownPong:914402799528333322> API Latency", `\`${client.ws.ping}ms\``)
                    .addField("<:BotDeveloperBadge:914361127939493928> Developer",
                    `\` 1 • DEVELOPER│Grass#3717\``)

                message.channel.send(botinfo);
            })
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new Discord.MessageEmbed()
                .setColor(ee.wrongcolor)
                .setFooter(ee.footertext, ee.footericon)
                .setTitle(`${emoji.msg.ERROR} ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message}\`\`\``)
            );
        }
    },
};