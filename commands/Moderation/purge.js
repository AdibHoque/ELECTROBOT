const { Discord, MessageEmbed } = require("discord.js");
const RichEmbed = MessageEmbed;

module.exports = {
  name: "purge",
  category: "Moderation",
  description: "Bulk delete messages!",
  aliases: [],
  usage: "purge",
  run: async (client, message, args) => {
    const msg = message;
    msg.delete();
    if (
      msg.channel.permissionsFor(msg.author.id).has("MANAGE_MESSAGES") === false
    ) {
      const embed = new MessageEmbed()
        .setColor("#FFBF00")
        .setDescription(
          "YOU NEED THE `MANAGE_MESSAGES` PERMISSION IN ORDER TO USE THIS COMMAND!"
        );

      return msg.channel.send({ embed });
    }
    const msgCount = args[0];
    msg.channel.messages.fetch({ limit: msgCount }).then(messages => {
      msg.channel.bulkDelete(messages).catch(error => console.log(error.stack));
      msg.channel
        .send(
          `<a:ElectroCheck:709464171825201315> ${msgCount} MESSAGES WERE DELETED!`
        )
        .then(m => {
          setTimeout(() => {
            m.delete();
          }, 3000);
        });
    });
  }
};
