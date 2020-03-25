exports.run = (client, message, args, userData) => {
    // If no specific command is called, show all filtered commands
    if (!args[0]) {
        // Filter all commands to those that are available for the user
        const myCommands = (!client.config.admins.includes(message.author.id)) ? client.commands.filter(cmd => cmd.conf.requireAdmin == false) : client.commands;
        // Here we have to get the command names only, and we use that array to get the longest name
        // This makes the commands "aligned" in the output
        const commandNames = myCommands.keyArray();
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        let currentCategory = "";
        let output = `== Command List ==\nUse ${client.config.prefix}help <command name> for details\nAsk questions about the game in #reddit-emblem-heroes\n`;
        const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach( c => {
            const cat = client.functions.get("toProperCase").run(c.help.category);
            if (currentCategory !== cat) {
                output += `\u200b\n= ${cat} =\n`;
                currentCategory = cat;
            }
            output += `${client.config.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
        });
        client.users.get(message.author.id).send(output, {code: "asciidoc", split: { char: "\u200b" }});
        if (message.guild) {
            message.channel.send("I sent the commands list to you *personally*. You're welcome.");
        }
    } else {
        // Show individual command's help
        let cmd = String(args[0]).toLowerCase();
        const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
        var output = '';
        if (command) {
            if (command.conf.requireAdmin && !client.config.admins.includes(message.author.id)) return message.channel.send("That is not an available command.");
            output += `= ${client.config.prefix}${command.help.name} = \n${command.help.description}\nusage   :: ${client.config.prefix}${command.help.usage}`;
            if (command.help.usage2) {
                output += `\nusage 2 :: ${client.config.prefix}${command.help.usage2}`;
            }
            if (command.help.usage3) {
                output += `\nusage 3 :: ${client.config.prefix}${command.help.usage3}`
            }
            if (command.help.usage4) {
                output += `\nusage 4 :: ${client.config.prefix}${command.help.usage4}`
            }
            output += `\naliases :: ${command.conf.aliases.join(", ")}\nwiki    :: ${command.help.wiki}`;
            message.channel.send(output, {code:"asciidoc"});
        } else {
            message.channel.send("That is not an available command.");
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: false,
    aliases: ["h", "commands", "command", "halp"]
};

exports.help = {
    name: "help",
    category: "General",
    description: "Views a generic help message.",
    usage: "help",
    usage2: "help <command name>",
    wiki: "N/A"
};