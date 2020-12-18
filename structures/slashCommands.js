const Eris = require("eris");

const APPLICATIONS = `/applications`

// method
const APPLICATION = (clientID) => `${APPLICATIONS}/${clientID}`;
const APPLICATION_COMMANDS = (clientID) => `${APPLICATION(clientID)}/commands`;
const APPLICATION_COMMAND = (clientID, commandID) => `${APPLICATION_COMMANDS(clientID)}/${commandID}`;
const APPLICATION_GUILD = (clientID, guildID) => `${APPLICATION(clientID)}/guilds/${guildID}`;
const APPLICATION_GUILD_COMMANDS = (clientID, guildID) => `${APPLICATION_GUILD(clientID, guildID)}/commands`;
const APPLICATION_GUILD_COMMAND = (clientID, guildID, commandID) => `${APPLICATION_GUILD_COMMANDS(clientID, guildID)}/${commandID}`;

class DiscordSlash {
	constructor(client, clientID) {
		this.clientID = clientID;
		this.client = client;
	}

	fetchGuildCommands(guildID) {
		return this.client.requestHandler.request("GET", APPLICATION_GUILD_COMMANDS(this.clientID, guildID), true);
	}

	createGuildCommand(data, guildID) {
		return this.client.requestHandler.request("POST", APPLICATION_GUILD_COMMANDS(this.clientID, guildID), true, data);
	}

	deleteGuildCommand(commandID, guildID) {
		return this.client.requestHandler.request("DELETE", APPLICATION_GUILD_COMMAND(this.clientID, guildID, commandID), true);
	}

	fetchCommands() {
		return this.client.requestHandler.request("GET", APPLICATION_COMMANDS(this.clientID), true);
	}

	createCommand(data, guildID) {
		return this.client.requestHandler.request("POST", APPLICATION_COMMANDS(this.clientID), true, data);
	}

	deleteCommand(commandID, guildID) {
		return this.client.requestHandler.request("DELETE", APPLICATION_COMMAND(this.clientID, commandID), true);
	}
}

module.exports = DiscordSlash;