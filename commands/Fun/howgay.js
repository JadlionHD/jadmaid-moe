exports.run = function (client, msg, args) {
	const randmath = Math.floor(Math.random() * 100 + 1);
    let user = msg.mentions[0];
    if(!user) user = msg.author;
    if(user.id === "421307985827201024") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);
    if(user.id === "494219204610883594") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);

    msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **${randmath}%** Gay!`)


}
// 🏳️‍🌈
exports.aliases = [];