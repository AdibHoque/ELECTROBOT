const { Discord, MessageEmbed } = require("discord.js");
const RichEmbed = MessageEmbed;
const check = "<a:ElectroCheck:709464171825201315>";
const fail = "<a:ElectroFail:656772856184832025>";
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://ELECTRO:electrobot6969@electro-jbqon.mongodb.net/Guilds?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const u = require("./../../Mongodb/user");

module.exports = {
  name: "pay",
  category: "Economy",
  description: "Transfer your money to someone!",
  aliases: ["payment", "give"],
  usage: "pay <@user> <amount>",
  run: async (client, message, args, prefix) => {
    const msg = message;
    const memberToAdd =
      message.mentions.users.first() || (await client.users.fetch(args[1]));
    const userResult = await u.findOne({
      name: "users",
      preid: message.author.id
    });
    if (!userResult) {
      message.channel.send(
        "You don't have a economy account yet, get started by doing `${prefix}daily`."
      );
    }
    const user2Result = await u.findOne({
      name: "users",
      preid: memberToAdd.id
    });
    if (!user2Result) {
      return message.channel.send(
        "They don't have a economy account yet, tell them to get started by doing `${prefix}daily`."
      );
    }
    if (!memberToAdd)
      return message.channel.send(
        "Improper usage, please mention someone to pay!"
      );
    if (memberToAdd.bot)
      return message.channel.send("You can't pay a bot account!");
    const amountToAdd = parseInt(args[1]);
    const senderINFO = await u.findOne({
      name: "users",
      preid: message.author.id
    });
    const senderCredits = senderINFO.balance ? senderINFO.balance : 0;

    if (!memberToAdd || isNaN(args[1]))
      return message.channel.send(
        `Improper Usage, you need to do \`${prefix}pay <user> <amount>\``
      );

    if (memberToAdd.id == message.author.id)
      return message.channel.send("You can't pay to yourself!");
    if (senderCredits <= 0)
      return message.channel.send(
        `You don't have any money on your hand!\nType \`${prefix}daily\` to get some money.`
      );

    if (!amountToAdd || amountToAdd < 1 || isNaN(amountToAdd))
      return message.channel.send("Invalid amount!");
    if (senderCredits < amountToAdd)
      return message.channel.send(`You don't have enough money to do that!`);

    await require("./../../Mongodb/user.js").updateOne(
      { preid: message.author.id },
      { $inc: { balance: -parseInt(amountToAdd) } }
    );
    await require("./../../Mongodb/user.js").updateOne(
      { preid: memberToAdd.id },
      { $inc: { balance: parseInt(amountToAdd) } }
    );
    const embed = new MessageEmbed()
      .setTitle("Payment Successful")
      .setDescription(`You paid ${memberToAdd} **$${amountToAdd}**!`)
      .setThumbnail(
        "https://cdn.glitch.com/7be22abc-1b5d-415c-ba45-ac77001d72be%2Fpayment%20(1).png?v=1597248990902"
      )
      .setColor("#ffbf00");
    message.channel.send(embed);
  }
};
