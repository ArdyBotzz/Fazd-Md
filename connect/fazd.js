const {
	default: makeWASocket,
	WASocket, 
	AuthenticationState,
	WAMessage, 
	Contact, 
	SocketConfig, 
	DisconnectReason, 
	BaileysEventMap,
	GroupMetadata,
	AnyMessageContent,
	MessageType,
	MiscMessageGenerationOptions,
	BufferJSON,
	delay,
	useSingleFileAuthState,
	downloadContentFromMessage,
	generateWAMessage,
	generateWAMessageFromContent
} = require('@adiwajshing/baileys-md')
const fs = require("fs")
const moment = require("moment-timezone")
const { color } = require("../lib/color")
const { exec } = require("child_process")
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep } = require("../lib/myfunc");
sph = "き⃟🌹"
fake = "Fazd-bot created by Ardy"

let setting = JSON.parse(fs.readFileSync("./setting.json"))
let mess = JSON.parse(fs.readFileSync('./connect/mess.json'));
let {
imgPath,
ownerNumber,
ownerName,
botName
} = setting

// db
// let welcome = JSON.parse(fs.readFileSync("./database/welcome.json"))

module.exports = async (fazd, msg) => {
        try {
            const type = Object.keys(msg.message)[0]
            body = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'documentMessage') && msg.message.documentMessage.caption ? msg.message.documentMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type == "templateButtonReplyMessage" && msg.message.templateButtonReplyMessage.selectedId) ? msg.message.templateButtonReplyMessage.selectedId : ''
            //cmd = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message[type].caption ? msg.message[type].caption : (type == 'videoMessage') && msg.message[type].caption ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text ? msg.message[type].text : (type == 'listResponseMessage') && msg.message[type].singleSelectReply.selectedRowId ? msg.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : ""
            //button = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedDisplayText : ''
            budy = (type === 'conversation') ? msg.message.conversation : (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : ''
            //selectedButton = (type == 'buttonsResponseMessage') ? msg.message.buttonsResponseMessage.selectedButtonId : ''
            //responseButton = (type == 'listResponseMessage') ? msg.message.listResponseMessage.title : ''
            if (fazd.multi) {
            var prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓=|~xzZ+×_*!#,|`÷?;:%^&./\\©^]/gi) : '.'
            } else {
            if (fazd.nopref) {
            var prefix = ''
            } else {
            var prefix = fazd.prefa
            }
            }
            const command = body.startsWith(prefix) ? body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() : ''
            const isCmd = body.startsWith(prefix)
            const { menu } = require("./help.js")
            const from = msg.key.remoteJid
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? msg.participant : msg.key.remoteJid
            const isOwner = ownerNumber.includes(sender) 
            budy = (type === "conversation") ? msg.message.conversation : (type === "extendedTextMessage") ? msg.message.extendedTextMessage.text : ""
            const pushname = msg.pushName
            //const teh = msg.key.fromMe ? msg.user.jid : msg.contacts[sender] || { notify: jid.replace(/@.+/, "") };
            //const pushnames = msg.key.fromMe ? msg.user.name : teh.notify || teh.vname || teh.name || "Null Name"
            const args = body.trim().split(/ +/).slice(1)
            const q = args.join(" ")
            const botNumber = fazd.user.id.split(':')[0] + '@s.whatsapp.net'
            //const totalchat = await fazd.chats.all()
            const groupMetadata = isGroup ? await fazd.groupMetadata(from) : ''
	        const groupName = isGroup ? groupMetadata.subject : ''
	        const groupId = isGroup ? groupMetadata.id : ''
	        const groupMembers = isGroup ? groupMetadata.participants : ''
	        const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
	        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
	        const isGroupAdmins = groupAdmins.includes(sender) || false

            const isUrl = (url) => {
                return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }

            const reply = (string) => {
                fazd.sendMessage(from, { text: string, qouted: msg })
            }
            
            fazd.createMessage = async (jidnya, kontennya, optionnya) => {
            return await generateWAMessage(jidnya, kontennya, {...optionnya,userJid: fazd.authState.creds.me.id,upload: fazd.waUploadToServer})
            }
            
            /*fazd.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
            let mime = (message).mimetype || ''
            let messageType = mime.split('/')[0]
            let extension = mime.split('/')[1]
            trueFileName = attachExtension ? (filename + '.' + extension) : filename
            const stream = await downloadContentFromMessage(message, messageType)
            let buffer = Buffer.from([])
            for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
            }
            // save to file
            await fs.writeFileSync(trueFileName, buffer)
            return trueFileName
           }*/
            
            const sendContact = (jid, numbers, name, quoted, men) => {
            let number = numbers.replace(/[^0-9]/g, '')
            const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:' + name + '\n'
            + 'ORG:;\n'
            + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
            + 'END:VCARD'
            return fazd.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : men ? men : []},{ quoted: quoted })
            }
            
const sendButton5 = async (id, text1, desc1, yo) => {
// by fabil & rashid
var buatpesan = await generateWAMessageFromContent(from, {
    "templateMessage": {
      "hydratedTemplate": {
        ...yo.message,
        "hydratedContentText": text1,
        "hydratedFooterText": desc1,
        "hydratedButtons": [
          {
            "urlButton": {
              "displayText": "Github Owner",
              "url": "https://github.com/ArdyBotzz"
            }
          },
          {
            "callButton": {
              "displayText": "Call Owner",
              "phoneNumber": "6287863200063"
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Donasi",
              "id": `${prefix}donasi`
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Script",
              "id": `${prefix}sc`,
            }
          },
          {
            "quickReplyButton": {
              "displayText": "Owner",
              "id": `${prefix}owner`
            }
          }
        ]
      }
    }
  }, {})
fazd.relayMessage(id, buatpesan.message, { messageId: buatpesan.key.id })
}
           
            const sendPhoto = (imageDir, caption) => {
                fazd.sendMessage(from, {
                    image: fs.readFileSync(imageDir),
                    caption: caption
                })
            }
            
            const jsonformat = (json) => {
                return JSON.stringify(json, null, "\t")
            }

            const textButtons = (firstId, firstText, secondId, secondText, content) => {
                var buttonsContent = [
                    { buttonId: firstId, buttonText: { displayText: firstText }, type: 1 },
                    { buttonId: secondId, buttonText: { displayText: secondText }, type: 1 }
                ]

             //Button Text
             const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
             const buttonMessage = {
             contentText: text1,
             footerText: desc1,
              buttons: but,
              headerType: 1
              }
              fazd.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options)
              }

                var msgContent = {
                    contentText: content,
                    footerText: 'Fazd - Multi Device',
                    buttons: buttonsContent,
                    headerType: 1
                }
                return msgContent
            }
            
            if (fazd.mode == "self") {
            if (!msg.key.fromMe && !isOwner) return
            }
            
            if (fazd.autoRead) {
            fazd.sendReadReceipt(from, sender, [msg.key.id])
            }

const hour_now = moment().format('HH')
var ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐏𝐚𝐠𝐢'//'Pagi🌄'
if (hour_now >= '03' && hour_now <= '10') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠'//'Pagi 🌅'
} else if (hour_now >= '10' && hour_now <= '14') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐢𝐚𝐧𝐠'//'Siang 🌞'
} else if (hour_now >= '14' && hour_now <= '17') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐒𝐨𝐫𝐞'//'Soree ☀️'
} else if (hour_now >= '17' && hour_now <= '18') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'//'Selamat 🌠'
} else if (hour_now >= '18' && hour_now <= '23') {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'//'Malam 🌌'
} else {
ucapanWaktu = '𝐒𝐞𝐥𝐚𝐦𝐚𝐭 𝐌𝐚𝐥𝐚𝐦'//'Selamat Malam!'
}


const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const wib = moment.tz('Asia/Jakarta').format('HH : mm : ss')
const wita = moment.tz('Asia/Makassar').format('HH : mm : ss')
const wit = moment.tz('Asia/Jayapura').format('HH : mm : ss')

var dates = moment().tz('Asia/Jakarta').format("YYYY-MM-DDTHH:mm:ss");
var date = new Date(dates);
var tahun = date.getFullYear();
var bulan = date.getMonth();
var tanggal = date.getDate();
var hari = date.getDay();
var jam = date.getHours();
var menit = date.getMinutes();
var detik = date.getSeconds();
var waktoo = date.getHours();

switch(hari) {
case 0: hari = "Minggu"; break;
case 1: hari = "Senin"; break;
case 2: hari = "Selasa"; break;
case 3: hari = "Rabu"; break;
case 4: hari = "Kamis"; break;
case 5: hari = "Jum`at"; break;
case 6: hari = "Sabtu"; break;
}
switch(bulan) {
case 0: bulan = "Januari"; break;
case 1: bulan = "Februari"; break;
case 2: bulan = "Maret"; break;
case 3: bulan = "April"; break;
case 4: bulan = "Mei"; break;
case 5: bulan = "Juni"; break;
case 6: bulan = "Juli"; break;
case 7: bulan = "Agustus"; break;
case 8: bulan = "September"; break;
case 9: bulan = "Oktober"; break;
case 10: bulan = "November"; break;
case 11: bulan = "Desember"; break;
}
var Tanggal= "" + hari + ", " + tanggal + " " + bulan + " " + tahun;

//var groups = fazd.chats.array.filter(v => v.jid.endsWith('g.us'))
//var private = fazd.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
menunya = `*Menu Fazd Bot*

⏰ _*${ucapanWaktu}*_
*き⃟🌍 Date* : _${Tanggal}_
 Wib : _${wib}_
 Wit : _${wit}_
 Wita : _${wita}_
 
 
⛾ *Bot Info*
き⃟💞 Mode : _${fazd.mode}_
- - - - - - - -
Your Name : _${pushname}_
Tag : _${sender}_


${menu(prefix)}`

        if (isCmd && !isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix}${command} [${args.length}]`), 'from', color(pushname))
        }
        if (isCmd && isGroup) {
			console.log(color('[CMD]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${prefix}${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
        }
        
        if (budy.startsWith("x ")) {
        if (!isOwner) return
        var bang = await eval(`;(async () => { return ${budy.slice(2)} })();`)
        reply(jsonformat(bang))
        }
        
        if (budy.startsWith("$ ")) {
        if (!isOwner) return
        exec(budy.slice(2), async (err, stdout) => {
        if (err) return reply(err)
        reply(stdout)
        })
        }
            
            switch(command) {
                case 'menu':
if (fazd.modelmenu == "gif") {
// gif buttons 5
await sendButton5(from, menunya, fake, await fazd.createMessage(from, {video: {url: "./media/domge.mp4", caption: menunya}, gifPlayback: true}))
} else if (fazd.modelmenu == "image") {
// image button 5
await sendButton5(from, menunya, fake, await fazd.createMessage(from, {image: {url: setting.imgPath, caption: menunya}}))
}
                break

case "donasi":
fazd.sendMessage(from, {text: `${sph}  Donasi
*Gopay* : _08813647351_
*Dana* : _08813647351_
${sph}  Donasi Seikhlas Nya`, quoted: msg})
break

case "sc":
case "sourcecode":
case "scriptbot":
fazd.sendMessage(from, {text: `Pastinya bukan sc gh atau sc yt:v`, quoted: msg})
break

case "setprefix":
if (!q) return reply("Masukan opts : [multi/nopref]")
if (q == "multi") {
fazd.nopref = false
fazd.multi = true
reply("Done change prefix to "+q)
} else if (q == "nopref") {
fazd.multi = false
fazd.nopref = true
reply("Done change prefix to "+q)
} else {
fazd.nopref = false
fazd.multi = false
fazd.prefa = q
reply("Done change prefix to "+q)
}
break

case "owner":
for (let i of ownerNumber) {
sendContact (from, i.split("@")[0], "Owner Bot - "+botName, msg)
}
break

case "setmenu":
if (!q) return reply(`Masukan opts :\n
${sph}gif
${sph}image`)
if (q == "gif") {
fazd.modelmenu = "gif"
reply("Done change menu to "+q)
} else if (q == "image") {
fazd.modelmenu = "image"
reply("Done change menu to "+q)
} else {
reply(`Masukan opts :\n
${sph}gif
${sph}image`)
}
break
                 /* case prefix + "welcome": {
                    if (!isGroup) return reply(mess.OnlyGrup)
                    if (!isGroupAdmins && !isOwner) return reply(mess.GrupAdmin)
                    if (args.length == 0) return reply(`Pilih on atau off`)
                    if (args[0].toLowerCase() == "on") {
                      if (isWelcome) return reply(`Udah aktif`)
                      welcome.push(from)
                      fs.writeFileSync("./database/welcome.json", JSON.stringify(welcome))
                      reply("Welcome di group ini aktif")
                    } else if (args[0].toLowerCase() == "off") {
                      //if (!isAntiLink) return reply("Anti link di group ini belum pernah aktif")
                      let anu = welcome.indexOf(from)
                      welcome.splice(anu, 1)
                      fs.writeFileSync("./database/welcome.json", JSON.stringify(welcome))
                      reply("Welcome di group ini mati")
                    } else {
                      reply(`Pilih on atau off`)
                    }
                  }
                  break */

        case 'p':
              const buttons = [
  {buttonId: `${prefix}menu`, buttonText: {displayText: 'MENU'}, type: 1},
  {buttonId: 'id2', buttonText: {displayText: 'Button 2'}, type: 1},
  {buttonId: 'id3', buttonText: {displayText: 'Button 3'}, type: 1}
]

const buttonMessage = {
    text: "Hi it's button message",
    footerText: 'Hello World',
    buttons: buttons,
    headerType: 1
}
fazd.sendMessage(from, buttonMessage)
               break
               
////////////////////END BRAY..... /////////////////////
            }
        } catch (e) {
            console.log(e)
        }
}