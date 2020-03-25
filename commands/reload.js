exports.run = (client, message, args, userData) => {
    // If there aren't enough arguments, print a help message
    if (!args || args.length < 1) return message.channel.send("Please provide a function or command to reload.");
    // Get the name of the thing to reload
    const name = args[0];
    // Check if the thing exists and is valid
    if (!client.commands.has(String(name).toLowerCase()) && !client.functions.has(name) && !client.aliases.get(String(name).toLowerCase())) {
        return message.channel.send("That does not exist.");
    }
    if (client.commands.has(String(name).toLowerCase()) || client.aliases.get(String(name).toLowerCase())) {
        if (client.commands.has(String(name).toLowerCase())) {
            var cmd = name;
        } else {
            var cmd = client.commands.get(client.aliases.get(String(name).toLowerCase())).help.name;
        }
        // The path is relative to the *current folder*, so just ./filename.js
        delete require.cache[require.resolve(`./${cmd}.js`)];
        // We also need to delete and reload the command from the client.commands Enmap
        client.commands.delete(cmd);
        const props = require(`./${cmd}.js`);
        client.commands.set(cmd, props);
        message.channel.send(`The command ${cmd} has been reloaded.`);
    }
    if (client.functions.has(name)) {
        // Functions are stored somewhere else
        delete require.cache[require.resolve(`../functions/${name}.js`)];
        // We also need to delete and reload the function from the client.functions Enmap
        client.functions.delete(name);
        const props = require(`../functions/${name}.js`);
        client.functions.set(name, props);
        message.channel.send(`The function ${name} has been reloaded.`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["l", "load"]
};

exports.help = {
    name: "reload",
    category: "Administration",
    description: "Reloads a command or function.",
    usage: "reload <command/function name>",
    wiki: "N/A"
};