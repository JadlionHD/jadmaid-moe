const { VERSION } = require("eris");

exports.run = function (client, msg, args) {
	let user = msg.author;
	let wsPING = new Date().getTime() - msg.timestamp;
    let ShardPING = client.shards.get(0).latency;

    let msgEmbed = {
        embed: {
            color: client.config.colors.success,
            description: `
🏓 Bot Ping: \`${wsPING}ms\`
📡 Shards Ping: \`${ShardPING}ms\`
`,
            footer: {
                text: `Powered by Eris v${VERSION}`
            }
        }
    }
    msg.channel.createMessage(msgEmbed)
}

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    description: "Testing Latency of Discord API",
    usage: `j!ping (no argument)`,
    example: `j!ping`,
    aliases: []
}