const fs = require("fs");

exports.run = function (client, msg, args) {
	let commands = Array.from(client.commands.keys()).sort().join(', ');
	let user = msg.author;
    let findOwner = client.config.ownerID[0];
    let getOwner = client.users.get(findOwner);
    //let customPrefix = client.database.get(`prefix_${msg.channel.guild.id}`) || client.config.PREFIX;
    let customPrefix = client.config.PREFIX;

    if(args[0] && client.commands.has(args[0])) {
        let msgReply = {
            embed: {
                color: client.config.colors.success,
                title: `Command: ${customPrefix}${args[0]}`,
                description: `
**Description:** \`${client.commands.get(args[0]).help.description}\`
**Cooldown:** \`${client.commands.get(args[0]).help.cooldown} seconds\`
**User Permissions:** \`${client.commands.get(args[0]).help.userPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') ? client.commands.get(args[0]).help.userPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') : "None"}\`
**Client Permissions:** \`${client.commands.get(args[0]).help.clientPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') ? client.commands.get(args[0]).help.clientPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') : "None"}\`
**Alias:** \`${client.commands.get(args[0]).help.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') ? client.commands.get(args[0]).help.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ') : "None"}\`
**Usage:** \`${client.commands.get(args[0]).help.usage}\`
**Example:**
\`\`\`
${client.commands.get(args[0]).help.example}
\`\`\`
`,
                footer: {
                    text: `Syntax: [required], <optional>, (comments)`
                },
            }
        }
        msg.channel.createMessage(msgReply)
    }

    if(!args[0]) {
        msg.channel.createMessage({
            embed: {
                color: client.config.colors.success,
                title: `<:GrowScan9000:535054816498679838> List commands`,
                description: `
 \`\`\`yaml
• Prefix: ${customPrefix}
• Help commands: ${customPrefix}help
• Website: https://jadmaid.xyz
• Support server: https://discord.gg/zCr2jeZ
• Do j!help <commands> to see detail command!
\`\`\`
`,
                fields: [
                    {
                        name: `<a:flex:606504992634961950> Fun commands:`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/fun`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `<:Question:538303543363502082> Info commands:`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/info`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `🔨 Utility`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/utility`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `<:growtopia_title:538303118698610702> Growtopia Reference:`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/growtopia`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `<:Kewlgurl:709312006167068704> Anime commands:`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/anime`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `🔧 Moderation`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/moderation`).map(str => `\`${str[0] + str.slice(1)}\``).join(" ").replace(/.js/g, '')}
`
                    },
                    {
                        name: `👥 Support/Developer:`,
                        value: `
${fs.readdirSync(`${process.cwd()}/commands/support`).map(str => `\`${str[0] + str.slice(1)}\``).join(" ").replace(/.js/g, '')}
`
                    }
                ],
                footer: {
                    text: `Developer ${getOwner.username}#${getOwner.discriminator}`,
                    icon_url: `${getOwner.avatarURL}`
                }
            }
        });
    }
};

/*
\`\`\`
<> = Optional!
[] = Required!
() = Comments!
\`\`\`
*/

exports.help = {
    cooldown: 3,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Showing all list of the commands!",
    usage: `j!help <commands>`,
    example: `j!help\nj!help stats (to showing detail of the command)`,
    aliases: []
}