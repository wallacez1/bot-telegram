'use strict'
require('dotenv').config();

const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram(process.env.TELEGRAM_KEY, {
    workers: 1
})


const TrafficInfoController = require('./controllers/traffic')
const OtherwiseController = require('./controllers/otherwise')

tg.router.when(new Telegram.TextCommand('/trafic', 'TrafficInfo'), new TrafficInfoController())
.otherwise(new OtherwiseController())