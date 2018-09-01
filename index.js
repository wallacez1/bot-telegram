'use strict'
// require('dotenv').config();
// var express = require('express')
// var app = express();

// // app.listen(process.env.PORT || 8888, function(){
// //     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
// //   });

const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram('679789296:AAGIcT46kgNDwyzbAI5RpVVCo-54DvJ9fZo', {
    workers: 5
})



const TrafficInfoController = require('./controllers/traffic')
const OtherwiseController = require('./controllers/otherwise')

tg.router.when(new Telegram.TextCommand('/trafic', 'TrafficInfo'), new TrafficInfoController())
.otherwise(new OtherwiseController())