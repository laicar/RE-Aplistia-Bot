exports.run = (client, message, args, userData) => {
    var text = args.join(" ");
    client.guilds.get(client.config.announcementGuild).channels.get(clien.config.announcementChannel).send(text);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["announcement"]
};

exports.help = {
    name: "announce",
    category: "Administration",
    description: "Posts a message from Edward to the channel designated in the config file.",
    usage: "announce <message>",
    wiki: "N/A"
};