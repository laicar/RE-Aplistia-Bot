module.exports = async (client, message) => {
    // Ignore everything on the testing servers... if Edward himself was there, anyway.
    //if (message.guild && client.config.testingMode == "false" && (message.guild.id == 549453292762038282 || message.guild.id == 597606244156571660)) return;
    // Ignore all bots beyond this point
    if (message.author.bot) return;
    // Ignore messages not starting with the prefix (in config.json)
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    // Also ignore innocent messages that just happen to start with several "?"
    if (message.content == "?" || message.content.match(/^??+/)) return;
    // Enable this if you want only admins to be able to use Hubba
    //if (!client.config.admins.includes(message.author.id)) return message.channel.send("Hubba is currently locked. Try again later.");
    // Pull out the name of the command and any arguments
    var args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    // Grab the command word or a command alias from the client.commands Enmap
    var cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    // If that command doesn't exist, say so
    if (!cmd) return message.channel.send("Not a command.");
    // If it's an admin-only command and they're not an admin, don't allow it
    if (cmd.conf.requireAdmin && !client.config.admins.includes(message.author.id)) return client.functions.get("nothing").run(message);
    // If the command is disabled, don't allow it
    if (!cmd.conf.enabled) return message.channel.send("That command is currently disabled.");
    // Prevent users from running commands in DMs that can only be run on a server
    if (!message.guild && cmd.conf.guildOnly) return message.channel.send("This command is unavailable via direct message. Please run this command on a server.");
    // Prevent users from running commands on a server that can only be run in DMs
    if (message.guild && cmd.conf.privateOnly) return message.channel.send("This command is only available in direct messages.");
    // If the member on a guild is invisible or not cached, fetch them (not sure if this is necessary?)
    if (message.guild && !message.member) await message.guild.fetchMember(message.author);
    // Print the command to the console, enable this for debugging mode
    client.logger.cmd(`${message.author.username} (${message.author.id}) ran command ${message.content}`);
    // Run the command
    cmd.run(client, message, args, userData);
};