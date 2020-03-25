// Load some modules
const discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");
const SQLite = require("better-sqlite3");
const client = new discord.Client();

// Set up the client
client.sql = new SQLite("./data/edward.sqlite");
client.logger = require("./functions/logger.js");
client.config = require("./config.json");
client.lc = require("./functions/loadCommand.js");
client.functions = new Enmap();
client.commands = new Enmap();
client.aliases = new Enmap();

// Set up functions
fs.readdir("./functions/", (err, files) => {
    if (err) return console.error(err);
    client.logger.log(`Loading ${files.length} functions.`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        try {
            const props = require(`./functions/${file}`);
            if (props.init) {
                props.init(client);
            }
            let functionName = file.split(".")[0];
            client.functions.set(functionName, props);
        } catch (e) {
            console.log(`Unable to load function ${file}: ${e}`);
        }
    });
});

// Set up events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    client.logger.log(`Loading ${files.length} events.`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

// Set up commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    client.logger.log(`Loading ${files.length} commands.`);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const commandResponse = client.lc.run(client, file);
        if (commandResponse) console.log(commandResponse);
    });
});

client.login(client.config.token);
