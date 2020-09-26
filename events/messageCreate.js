module.exports = async (client, msg) => {


    // prefix mention & prefix ping
    let prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (msg.content.match(prefixMention)) {
        msg.channel.createMessage(`Hey customers! You can call me by doing \`j!help\``)
    }

    // setup
    if(msg.channel.type == 1 || msg.author.bot || msg.member && msg.member.isBlocked) return;
    if (!msg.content.startsWith(client.config.PREFIX)) return;
    
    let [command, ...args] = msg.content.slice(client.config.PREFIX.length).split(' '); // eslint-disable-line

    if (client.aliases.has(command)) {
        command = client.aliases.get(command);
    }

    if (!client.commands.has(command)) {
        return msg.channel.createMessage("Unknown Command. Enter `j!help` for a list of valid commands.")
    }

    try {
        await client.commands.get(command).run( client, msg, args );
    } catch(e) {
        msg.channel.createMessage({ embed: {
            color: 0xFFD100,
            title: `${command} failed to run!`,
            description: 'The error has been reported to owner.'
        } });
        console.log('ERROR', e.message, e.stack.split('\n'));
    }
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    console.log(`[LOGS] [${year}-${month}-${date} ${hours}:${minutes}:${seconds}] ${msg.author.username}#${msg.author.discriminator} : ${command}\n[SERVER] ${msg.channel.guild.name}`)

};


/*
j!eval
msg.channel.getMessages(10).then((message) => {
    for(var i = 0; i < message.length; i++) {
        console.log(message[i].embeds.title)
    }
})

j!eval msg.channel.getMessages(10).then( (message) => {
    for(var i = 0; i < message.length; i++) {
        console.log(message[i].embeds)
    }
})



        // for(var i = 0; i < message.length; i++) {
        //     if(message[i].embeds.title.includes("Tier")) {
        //         console.log("true")
        //     }
        // }
*/