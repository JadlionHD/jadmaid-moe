exports.run = function (client, msg, args) {
	const randmath = Math.floor(Math.random() * 100 + 1);
	let say = args.join(" ");
    let user = msg.mentions[0] || client.users.get(say) || msg.author;
    if(user.id === "421307985827201024") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);
    if(user.id === "494219204610883594") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);

    msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **${randmath}%** Gay!`)


}
// 🏳️‍🌈
exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
    description: "gay r8 machine",
    usage: `j!howgay [userid/mention]`,
    example: `j!howgay`,
	aliases: []
}