'use strict'
const server = require('server');

const { get, post } = server.router;

// Launch server
server({ port: 3000 }, [  
    get('/', ctx => 'Hello world!')
]);

server.listen(process.env.PORT || port)

const Telegram = require('telegram-node-bot')
const tg = new Telegram.Telegram('679789296:AAGIcT46kgNDwyzbAI5RpVVCo-54DvJ9fZo', {
    workers: 1
})



const TrafficInfoController = require('./controllers/traffic')
const OtherwiseController = require('./controllers/otherwise')

tg.router.when(new Telegram.TextCommand('/trafic', 'TrafficInfo'), new TrafficInfoController())
.otherwise(new OtherwiseController())