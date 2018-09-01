
require('dotenv').config();
var express = require('express')
var app = express();

const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram(process.env.TELEGRAM_KEY, {
    
})

app.listen(process.env.PORT, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

const TrafficInfoController = require('./controllers/traffic')
const OtherwiseController = require('./controllers/otherwise')

tg.router.when(new Telegram.TextCommand('/trafic', 'TrafficInfo'), new TrafficInfoController())
.otherwise(new OtherwiseController())