exports.run = async (client, msg, args) => {
  const owners = client.config.ownerID.forEach(async(owner) => {
    
    if (msg.author.id !== owner) return;

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled = eval(code);
      let type = typeof evaled

      if (typeof evaled !== "string")
      evaled = require('util').inspect(evaled, { depth: 0});
      let output = client.util.clean(evaled);
      output = output.replace(new RegExp(client.token, 'gi'), '*');      

      if (output.length > 1024) {
          const postCode = await client.util.haste(output);
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: postCode,
            fields: [
              {name: 'Type', value: client.util.codeBlock(type, "js")}
            ]
    }});
      } else {
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: client.util.codeBlock(output, "js"),
            fields: [
              {name: 'Type', value: client.util.codeBlock(type, "js")}
            ]
    }});
      }
    } catch (e) {
      let error = client.util.clean(e);
      if (error.length > 1024) {
          const postCode = await client.util.haste(error);
            msg.channel.createMessage({embed: {
            color: client.config.colors.error,
            description: postCode,
            fields: [
              {name: 'Type', value: client.util.codeBlock(this.type, "js")}
            ]
    }});
      } else {
            msg.channel.createMessage({embed: {
            color: client.config.colors.success,
            description: client.util.codeBlock(error, "js"),
            fields: [
              {name: 'Type', value: client.util.codeBlock(this.type, "js")}
            ]
    }});
      }
    }

  });
}

exports.help = {
  cooldown: 3,
  ratelimit: 1,
  userPerms: [],
  aliases: []
}
