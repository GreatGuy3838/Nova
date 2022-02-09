const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const fs = require("fs");
const keepAlive = require('./server');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://discord.com/api/webhooks/927551202600812616/FUNH82eWYnR26HUEqfouInDggzO91qCgrJM-BEHO5bnivEg44AB6QGeGLZQi_T7kXpvR");
const DBL = require('dblapi.js');
const Emoji = require("./botconfig/emojis.json")
const { prefix, ServerID } = require("./botconfig/config.json")
const config = require("./botconfig/config.json")
    
const client = new Discord.Client({

  fetchAllMembers: false,

  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  presence: {
    afk: true,
    activity: {
      name: `${require("./botconfig/config.json").status.text}`.replace("{prefix}", require("./botconfig/config.json").prefix), 
      type: require("./botconfig/config.json").status.type, 
      url: require("./botconfig/config.json").status.url
    },
    status: "online"
  }
});

const dbl = new DBL(process.env.TOPGG_TOKEN, { webhookPort: 3000, webhookAuth: process.env.TOPGG_AUTH });
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.webhook.on('vote', vote => {
  const channel = client.channels.cache.get(process.env.POST_CHANNEL)
  const embed = new Discord.MessageEmbed()
  .setTitle("**__Nova Vote__**")
  .setDescription(`**
**
**Voter: <@${vote.user}>**
**Bot: <@${vote.bot}>**
**Type: ${vote.type}**
**2x: ${vote.isWeekend}**
**Link: ${process.env.VOTE_LINK}**`)
  .setImage(process.env.IMAGE_LINK)
  .setColor("GREEN")
  channel.send(embed)
});

client.on('guildCreate', guild => {

  guild.systemChannel.send(`**Thanks for inviting me!**\r\n\r\nGet a list of my commands by doing **!help**!\r\n\r\n**Invite:** https://discord.com/api/oauth2/authorize?client_id=933482669491240980&permissions=1099511627775&redirect_uri=https%3A%2F%2Fdiscord.gg%2FscazJBasBM&response_type=code&scope=bot%20guilds.join%20applications.commands\r\n\r\n**Support Server:** https://discord.gg/scazJBasBM\r\n\r\n**Vote:** https://top.gg/bot/933482669491240980/vote`)

const embed = new MessageBuilder()
.setTitle('I Joined A Guild!')
.setDescription(`**Guild Name:** ${guild.name} (${guild.id})\n**Members:** ${guild.memberCount}`)
.setTimestamp()
.setColor('RANDOM')
.setFooter(`I'm in ${client.guilds.cache.size} Guilds Now!`);
  
hook.send(embed);
});

client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

const Meme = require("memer-api");
client.memer = new Meme("D7FKH5ltWUe");

client.adenabled = true;
client.statusad = {
  name: `!help | NOVA OFFICIAL BOT`,
  type: "PLAYING", 
  url: ""
};
client.spacedot = "・";
client.textad = ".";

//DBL

//Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);

function requirehandlers(){
  client.basicshandlers = Array(
    "extraevents", "loaddb", "clientvariables", "command", "events", "erelahandler"
  );
  client.basicshandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requirehandlers();

function requiresociallogs(){
  client.socialhandlers = Array(
    "twitterfeed", /*"twitterfeed2",*/ "livelog", "youtube", "tiktok"
  );
  client.socialhandlers.forEach(handler=>{
    try{ require(`./social_log/${handler}`)(client); }catch (e){ console.log(e) }
  })
}requiresociallogs();


function requireallhandlers(){
  client.allhandlers = Array(
    "apply", "apply2", "apply3", "apply4", "apply5",
    "ticket", "ticket2", "ticket3", "ticket4", "ticket5",
    "roster", "roster2", "roster3",
    "welcome", "leave",
    "jointocreate", "logger", "reactionrole", "ranking",
    "antidiscord", "antilinks","anticaps", "blacklist", "keyword",
    "membercount", "autoembed", "suggest", "validcode", "dailyfact", "autonsfw",
    "aichat"
  )
  client.allhandlers.forEach(handler => {
    try{ require(`./handlers/${handler}`)(client); }catch (e){ console.log(e) }
  });
}requireallhandlers();

keepAlive();
client.login(process.env.TOKEN);

module.exports.requirehandlers = requirehandlers;
module.exports.requiresociallogs = requiresociallogs;
module.exports.requireallhandlers = requireallhandlers;


// slash Commands

const {
    MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch')
const {
    Slash
} = require("discord-slash-commands");
const slash = new Slash({
    client : client
})
const embed = new MessageEmbed();


slash.on("create", (d) => {
    console.log(`Command created: ${JSON.parse(d.config.data).name}`)
})

slash.on("command", async (command) => {

    if (command.name === "activities") {
        let channel = client.channels.cache.get(command.options.find(m => m.name === "channel").value);
        if (channel.type !== "voice") return command.callback("Channel must be a voice channel.")
        if (command.options.find(m => m.name === "type").value === "yt") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **YouTube Together** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "pn") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755827207812677713",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Poker Night** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "bio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "773336526917861400",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Betrayal.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
        if (command.options.find(m => m.name === "type").value === "fio") {
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "814288819477020702",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${client.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    embed.setTitle("Activity added!")
                    embed.setDescription(`Added **Fishington.io** to [${channel.name}](https://discord.gg/${invite.code})\n> Click on the hyperlink to join.`)
                    embed.setFooter(`Requested by ${command.author.username + "#" + command.author.discriminator}`)
                    embed.setColor("#7289DA")
                    command.callback({
                        embeds: embed
                    });
                })

        }
    }
})

client.on("ready", () => {
    console.log("Ready");
    slash.create({
        guildOnly: false,
        data: {
            name: "activities",
            description: "Voice channel activities",
            options: [{
                    name: "channel",
                    description: "Select the voice channel you want.",
                    required: true,
                    type: 7,
                },
                {
                    name: "type",
                    description: "Type of activity.",
                    required: true,
                    type: 3,
                    choices: [{
                            name: "YouTube Together",
                            value: "yt"
                        },
                        {
                            name: "Betrayal.io",
                            value: "bio"
                        },
                        {
                            name: "Poker Night",
                            value: "pn"
                        },
                        {
                            name: "Fishington.io",
                            value: "fio"
                        }
                    ]
                }
            ]
        }
    })
})


client.login(process.env.TOKEN)