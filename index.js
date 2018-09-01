'use strict'
var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});


const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram('679789296:AAGIcT46kgNDwyzbAI5RpVVCo-54DvJ9fZo', {
    workers: 1
})



const TrafficInfoController = require('./controllers/traffic')
const OtherwiseController = require('./controllers/otherwise')

tg.router.when(new Telegram.TextCommand('/trafic', 'TrafficInfo'), new TrafficInfoController())
.otherwise(new OtherwiseController())