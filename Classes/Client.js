// we are gonna make a class which is how I do :)

const { Client } = require("discord.js");
const Enmap = require("enmap");

module.exports = class Bot extends Client {
  constructor() {
    super({
      fetchAllMembers: true
    });
    this.commands = new Enmap();
    this.aliases = new Enmap();
    this.queue = new Map();
  }
};
