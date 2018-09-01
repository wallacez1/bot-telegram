'use strict'
require('dotenv').config();

const Telegram = require('telegram-node-bot');
const tg = Telegram.TelegramBaseController

var distance = require('google-distance-matrix');
var origins = [];
var destinations = [];
var meio = ''

distance.key(process.env.GOOGLE_KEY);

class TrafficInfoController extends Telegram.TelegramBaseController{
  
    traficHandler($) { 
   
        const form = {
            origem: {
                q: 'Digite Seu endereço de origem',
                error: 'Desculpa não entendi, digite novamente',
                validator: (message, callback) => {
                    
                     
                    if(message.text) {
                       
                        
                        callback(true, message.text)
                        return
                       
                    }
        
                    callback(false)
                }
            },
            destino: {
                q: 'Digite seu destino',
                error: 'Desculpa não entendi, digite novamente',
                validator: (message, callback) => {
                    if(message.text) {
                        destinations = message.text
                        
                        callback(true, message.text)
                        return
                    }
        
                    callback(false)
                }
            },
            destino: {
                q: 'Digite seu destino',
                error: 'Desculpa não entendi, digite novamente',
                validator: (message, callback) => {
                    if(message.text) {
                        destinations = message.text
                        
                        callback(true, message.text)
                        return
                    }
        
                    callback(false)
                }
            },
            

            
        }
        
        $.runForm(form, (result) => {
            
            $.runMenu({
                   message: 'Escolha seu metodo de transporte',
                   layout: 2,
                    resizeKeyboard: true,
                    'Andando': ($) => {meio='walking',realizarCalculo(meio)}, //will be on first line
                    'Dirigindo': ($) => {meio='driving',realizarCalculo(meio)}, //will be on second line
                    'Bicicleta': ($) => {meio='bicycling',realizarCalculo(meio)}, //will be on second line
                    oneTimeKeyboard: true,   
                
            })
           
            
           function realizarCalculo (meio){

            let mode=meio
            

           distance.mode(mode)

           if(meio='driving'){
            distance.traffic_model('pessimistic')
            distance.departure_time(Date.now())
           }

            origins = [result.origem]
            destinations = [result.destino]
            distance.matrix(origins, destinations, function (err, distances) {  
                           console.log('dentro da matrix',mode)
                if (err) {
                    return console.log(err);
                }
                if(!distances) {
                    return console.log('no distances');
                }
                if (distances.status == 'OK') {
                   
                    for (let i=0; i < origins.length; i++) {
                        for (let j = 0; j < destinations.length; j++) {
                            let origin = distances.origin_addresses[i];
                            let destination = distances.destination_addresses[j];
                            if (distances.rows[0].elements[j].status == 'OK') {
                                
                                if(mode =="driving"){
                                    console.log('dentro do driving',mode)
                                let distance = distances.rows[i].elements[j].distance.text;
                                let duracaoTrafico=distances.rows[i].elements[j].duration_in_traffic.text
                                let message='<b>A Distância de:</b>\n' + origin + '\n\n<b>Para:</b>\n' + destination + '\n\n<b>é:</b> '
                                 + distance + ' <b> com duração baseada no trafego de:</b> ' + duracaoTrafico;
                                $.sendMessage( message,{parse_mode:'HTML'})

                                }
                                else if (mode!=="driving"){
                                   
                                let  distance = distances.rows[i].elements[j].distance.text;
                                let duration = distances.rows[i].elements[j].duration.text;
                                let  message='<b>A distância de:</b>\n' + origin + '\n\n<b>Para:</b>\n' + destination + '\n\n<b>é:</b> ' + distance + ' <b> com duração de:</b> ' + duration;
                                $.sendMessage( message,{parse_mode:'HTML'})}

                            } else {
                                $.sendMessage( destination + ' desculpa não consegui definir seu tempo estimado ' + origin);
                            }
                        }
                    }
                }
            });
      }
            
    })
    
      
    }

    get routes() {
        return {
            'TrafficInfo': 'traficHandler'
        }
    }
    
}






module.exports = TrafficInfoController;