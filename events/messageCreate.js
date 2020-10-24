const ms = require("ms");

module.exports = async (client, msg) => {


    // prefix mention & prefix ping
    let prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (msg.content.match(prefixMention)) {
        msg.channel.createMessage(`Hey customers! You can call me by doing \`j!help\``)
    }

    // setup
    if(msg.channel.type == 1 || msg.author.bot || msg.member && msg.member.isBlocked) return;
    if (!msg.content.startsWith(client.config.PREFIX)) return;
    if(!msg.channel.permissionsOf(client.user.id).has("sendMessages")) return;

    let args = msg.content.slice(client.config.PREFIX.length).split(' '); // eslint-disable-line
    let command = args.shift().toLowerCase();

    if (client.aliases.has(command)) {
        command = client.aliases.get(command);
    }

    if (!client.commands.has(command)) {
        return msg.channel.createMessage("Unknown Command. Enter `j!help` for a list of valid commands.");
    }

    // Client Permissions
    if(client.commands.get(command).help.clientPerms.length === 1 && client.commands.get(command).help.clientPerms.some(p => msg.channel.permissionsOf(client.user.id).has(p) === false)) {
        return msg.channel.createMessage(`${msg.author.mention}, I'm missing permission of: \`${client.commands.get(command).help.clientPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ')}\` to use this command`)
    }

    // User Permissions
    if(client.commands.get(command).help.userPerms.length === 1 && client.commands.get(command).help.userPerms.some(p => msg.channel.permissionsOf(msg.author.id).has(p) === false)) {
        return msg.channel.createMessage(`${msg.author.mention}, You must have permission of: \`${client.commands.get(command).help.userPerms.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ')}\` to use this command`)
    }

    // cooldown
    if(client.commands.get(command).help) {
        const current = client.cooldown.get(`${command}-${msg.author.id}`);
        if(!current) client.cooldown.set(`${command}-${msg.author.id}`, 1);
        else {
            if(current >= client.commands.get(command).help.ratelimit) return msg.channel.createMessage(`${msg.author.mention} You are too quick using ${command} command! Please wait ${ms(client.commands.get(command).help.cooldown * 1000)}`).then((message) => {
                setTimeout(() => {
                    message.delete();

                }, 7 * 1000)
            })
            client.cooldown.set(`${command}-${msg.author.id}`, current + 1);
        }

        setTimeout(() => {
            client.cooldown.delete(`${command}-${msg.author.id}`);
        }, client.commands.get(command).help.cooldown * 1000)

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

    }
};