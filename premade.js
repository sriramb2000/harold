'use strict';

const axios = require('axios');
const giphy = require('giphy-api')('im2wgTOGVcDoNZvRHK2Uy0ZxM06iZ34x');
const botkit = require('botkit');
const dashbot = require('dashbot')('xoxp-353271521616-455697951538-458112584481-3206c22a613dee885ad5252d4b8e7730',
  {urlRoot: process.env.DASHBOT_URL_ROOT, debug:true}).slack;

const controller = botkit.slackbot();

function getAdvice(){
  return axios.get('http://api.adviceslip.com/advice').then(function(res){
    return res.data.slip.advice;
  });
}

controller.middleware.receive.use(dashbot.receive);
controller.middleware.send.use(dashbot.send);

controller.spawn({
  token: 'xoxb-353271521616-458914418181-dZ1oTraNkDgRbWhvustGjIC7'
}).startRTM();

controller.hears('hello',    ['direct_message','direct_mention','mention'],function(bot,message) {
  bot.startConversation(message, function(err, convo){
    convo.ask('HIHIHI WHAT YOU NEED');
  });
});



controller.hears(['moth', 'moths'],['direct_message','direct_mention','mention'], function(bot, message){
  bot.reply(message, "https://media.giphy.com/media/LWKSSrL0osNdS/giphy.gif");
});

controller.on(['direct_message','direct_mention','mention'], function(bot, message) {
  bot.startConversation(message, function(err, convo){
    convo.ask('WHAT\'s wrong man', async (answer, convo) =>{
      var advice = await getAdvice();
      convo.say(advice.toUpperCase());
      convo.next();
    });
  })
})

// controller.on('direct_message', function(bot, message) {
//   if (message.text.length%2==0) {
//     bot.reply(message, 'You are right when you say: ' + message.text);
//   } else {
//     bot.reply(message, {
//       "attachments": [
//         {
//           "fallback": "Required plain-text summary of the attachment.",
//
//           "color": "#36a64f",
//
//           "pretext": "Optional text that appears above the attachment block",
//
//           "author_name": "Bobby Tables",
//           "author_link": "http://flickr.com/bobby/",
//           "author_icon": "http://flickr.com/icons/bobby.jpg",
//
//           "title": "Slack API Documentation",
//           "title_link": "https://api.slack.com/",
//
//           "text": "Optional text that appears within the attachment",
//
//           "fields": [
//             {
//               "title": "Priority",
//               "value": "High",
//               "short": false
//             }
//           ],
//
//           "image_url": "http://my-website.com/path/to/image.jpg",
//           "thumb_url": "http://example.com/path/to/thumb.png",
//
//           "footer": "Slack API",
//           "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
//           "ts": 123456789
//         }
//       ]
//     });
//   }
// });

console.log('Slack bot ready');
