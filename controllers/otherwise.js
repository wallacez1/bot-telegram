'use strict'

const Telegram = require('telegram-node-bot')
 

class OtherwiseController extends Telegram.TelegramBaseController{
    handle($) {
        $.sendMessage('Eu não entendi o que você falou')
    }
}

module.exports = OtherwiseController;