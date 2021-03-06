const { MessageEmbed } = require('discord.js')
const data = require('quick.db')
const ayarlar = require('../ayarlar.json')
const inventory = require('../inventory/ServerConfig.json')
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
exports.run = async(client, message, args) => {
if(![inventory.ServerAuthorizedPerms.AbilityID, inventory.ServerAuthorizedPerms.BanSpearID].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setDescription(`${message.author} bu komutu kullanabilmek için <@&${inventory.ServerAuthorizedPerms.BanSpearID}> rolüne ihtiyacın var. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.NoEmbed)).then(x => x.delete({timeout: 6500}));
let BanLog = inventory.Channels.BanLogChannelID

let kullanici = args[0]
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir kullanıcı etiketlemelisin. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(!sebep) return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir sebep belirtmelisin. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === message.author.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Kanka sunucudan banlı olsaydın komutu giremezdin. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
if(kullanici.id === client.user.id)return message.channel.send(new MessageEmbed().setDescription(`${message.author}, Bir botun yasağını kaldıramazsın. ${inventory.Emoji.False}`).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true })).setColor(inventory.Colors.NoEmbed).setTimestamp()).then(x => x.delete({timeout: 6500}));
message.guild.members.unban(kullanici)

const doru = client.emojis.cache.get(inventory.Emoji.TrueID) 
message.react(doru)
client.channels.cache.get(BanLog).send(new MessageEmbed().setDescription(`Bir Üyenin Yasağı Kaldırıldı \n Yetkili: ${message.author} (\`${message.author.id}\`) \n Kullanıcı: <@${kullanici}> (\`${kullanici}\`) `).setAuthor(message.author.tag, message.author.avatarURL({dynamic:true})).setColor(inventory.Colors.Yesil))

}

exports.conf = {aliases: ["unban", "yasak-kaldır"], permLevel: 0} 
exports.help = {name: "yasak-aç"}
