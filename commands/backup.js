exports.run = (client, message, args, userData) => {
    client.functions.get("dbBackup").run(client);
    message.channel.send("Database backup complete.");
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["back-up"]
};

exports.help = {
    name: "backup",
    category: "Administration",
    description: "Creates a backup of the database.",
    usage: "backup",
    wiki: "N/A"
};