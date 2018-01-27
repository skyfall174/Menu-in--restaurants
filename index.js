import {getListek} from "./functions";
import Telegraf from "telegraf"


import config from "./config"
// const bot = new Telegraf(process.env.BOT_TOKEN)

const bot = new Telegraf(config.BOT_TOKEN)

bot.start((ctx) => {
    console.log('started:', ctx.from.id)
    return ctx.reply('Welcome!')
})
bot.command('help', (ctx) => ctx.reply('Send message "listek"'))
bot.hears("listek", (ctx) => getListek().then((mess) => {
    for (let m in mess) {
        ctx.reply(`${mess[m].title} \n\n\n\n ${mess[m].body}`)
    }
}))

bot.startPolling()