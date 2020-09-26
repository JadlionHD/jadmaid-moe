exports.run = function (client, msg, args) {
	let ball = ['Yes', 'No', 'Why are you even trying?', 'What do you think? NO', 'Maybe', 'Never', 'Yep'];
	let randomball = Math.floor(Math.random()*ball.length);
	msg.channel.createMessage(`${msg.author.mention} ${ball[randomball]}`)
}

exports.aliases = [];