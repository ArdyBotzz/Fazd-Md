const { 
default: makeWASocket, 
DisconnectReason, 
AnyMessageContent, 
delay, 
useSingleFileAuthState 
} = require('@adiwajshing/baileys-md')
const P = require("pino")
const { color, FazdLog } = require("./lib/color")
const { Boom } = require("@hapi/boom")
const fs = require("fs")
setting = JSON.parse(fs.readFileSync("./setting.json"))
const { state, loadState, saveState } = useSingleFileAuthState(setting.sesionName+".json")

require("./connect/fazd")
nocache("./connect/fazd", (module) => console.log(FazdLog(`Module "${module}" terupdate`)))
require("./connect/help")
nocache("./connect/help", (module) => console.log(FazdLog(`Module "${module}" terupdate`)))

/* sebelom pake mampir rest api gw dulu :
  https://api.ardyapi.xyz
  https://app.ardyapi.rf.gd
*/

async function start() {
  console.log(FazdLog("[MADE WITH XFAZD]"))
  const fazd = await makeWASocket({
    logger: P({ level: 'debug' }),
    browser: ["Fazd-Md","Safari","1.0.0"],
    printQRInTerminal: true,
    auth: state
  })
  console.log(color("Connected"))
  
  fazd.prefa = "."
  fazd.multi = true
  fazd.nopref = false
  fazd.mode = "public"
  fazd.autoRead = true
  fazd.modelmenu = "gif"
  
  fazd.ev.on("messages.upsert", async m => {
    if (!m.messages) return
    xfazd = m.messages[0]
    require("./connect/fazd")(fazd, xfazd)
  })
  
  fazd.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update
    if (connection == "close") {
      lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
                ? start()
                : console.log(FazdLog('connection closed'))
    }
  })
  
  fazd.ev.on('creds.update', saveState)
  
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
 function nocache(module, cb = () => { }) {
    console.log(color(`Module '${module}'`), color(`Dipantau oleh XFazd Team`, "cyan"))
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

start()
