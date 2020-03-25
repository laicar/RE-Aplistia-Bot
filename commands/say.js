exports.run = (client, message, args, userData) => {
    // You can't delete another person's message in a DM
    if (message.guild) {
        message.delete();
    }
    // Make sure we're not being dumb
    if (!args) return;
    // Convert the text to a clean string, then say it
    let text = args.join(" ");
    message.channel.send(String(text));
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    privateOnly: false,
    requireAccount: false,
    requireAdmin: true,
    aliases: ["echo", "words"]
};

exports.help = {
    name: "say",
    category: "Administration",
    description: "Makes Edward \"speak\".",
    usage: "say",
    wiki: "N/A"
};