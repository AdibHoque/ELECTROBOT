const {Discord, MessageEmbed, Util} = require("discord.js");
const RichEmbed = MessageEmbed
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBEAPIKEY);
const queue = new Map();
const {ffmpeg, avconv}  = require('ffmpeg')

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  console.log(video);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`,
    thumbnail: video.thumbnails.maxres.url,
    min: video.duration.minutes,
    sec: video.duration.seconds,
    artist: video.channel.title
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await msg.member.voice.channel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(`I could not join the voice channel: ${error}`);
    }
  } else {
    serverQueue.songs.push(song);
    console.log(serverQueue.songs);
    if (playlist) return undefined;
    else
      return msg.channel.send(
        `<a:ElectroCheck:709464171825201315> **${song.title}** HAS BEEN ADDED TO THE QUEUE!`
      );
  }
  return undefined;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }
  console.log(serverQueue.songs);

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", reason => {
      if (reason === "Stream is not generating quickly enough.")
        console.log("Song ended.");
      else console.log(reason);
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  const embed = new MessageEmbed()
  .setDescription(`<a:ElectroCheck:709464171825201315> Started Playing: **${song.title}**`)
  .setImage(song.thumbnail)
  .setFooter(`DURATION: ${song.min}:${song.sec} | ARTIST: ${song.artist}`)
  .setColor(`#ffbf00`)
  
  serverQueue.textChannel.send(embed);
}


module.exports = {
    name: "",
    category: "Music",
    description: "!",
    aliases: [],
    usage: "",
    run: async(client, message, args) => {
        const msg = message 
        const kargs = msg.content.split(" ");
        const searchString = kargs.slice(1).join(" ");
        const serverQueue = queue.get(msg.guild.id);
        const voiceChannel = msg.member.voice.channel;
    
        }
    } 