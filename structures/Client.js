const { Client, Collection } = require('eris');
const { readdir, readdirSync } = require('fs');
const fs = require("fs");
const path = require("path");

let nested_folder = ["Anime", "Fun", "Growtopia", "Info", "Support", "Utility"];
//let nested_folder = ["Support"];

class ErisBot extends Client {

    constructor(config, clientOptions) {

        super(config.TOKEN, clientOptions);

        this.config = config;
        this.util = require('./util.js');
        this.commands = new Collection();
        this.aliases = new Collection();
        this.cooldown = new Collection();
        this._loadCommands();
        this._eventLoader(this);
        this.fetch = require('axios');
    };


    _loadCommands() {
        nested_folder.forEach(c => {
            readdir(`${process.cwd()}/commands/${c}`, (err, files) => {
                if (err) throw err;

                files.forEach(f => {
                    const props = require(`${process.cwd()}/commands/${c}/${f}`);
                    const name = f.replace('.js', '').toLowerCase();

                    this.commands.set(name, props)

                    if(props.help.aliases) {
                        for(const alias of props.help.aliases) {
                            this.aliases.set(alias, name);
                        }
                    }
                })
            })
        })
    }

    _eventLoader(client) {
        const events = readdirSync("./events/");
        for (const event of events) {
            const file = require(`../events/${event}`);
            client.on(event.split(".")[0], (...args) => file(client, ...args));
        }
    }
}

module.exports = ErisBot;