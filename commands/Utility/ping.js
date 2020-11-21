const { VERSION } = require("eris");
const { version } = require("../../package.json");

exports.run = async function (client, msg, args) {
	let user = msg.author;
	let wsPING = new Date().getTime() - msg.timestamp;
    msg.channel.createMessage("Pinging..").then(message => {
        let msgEmbed = {
            embed: {
                color: client.config.colors.success,
                description: `
🏓 **Discord API Ping:** \`${message.timestamp - msg.timestamp}ms\`
🌐 **WebSocket Ping:** \`${msg.channel.guild.shard.latency}ms\`
`,
                footer: {
                    text: `Powered by Eris v${VERSION} | Bot version v${version}`
                }
            }
        }
        setTimeout(() => { message.edit(msgEmbed) }, 1000)
    });
}



/*
msg.channel.createMessage(msgEmbed).then((message) => {
    message.addReaction("✅");
})
*/

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Testing Latency of Discord API",
    usage: `j!ping (no argument)`,
    example: `j!ping`,
    aliases: []
}