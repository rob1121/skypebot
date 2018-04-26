var restify = require('restify');
var builder = require('botbuilder');
const translate = require('translate');

translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20180426T095042Z.23762791ca618ab3.009a970735a88ad1cded4b90f04cfcd728bdc9d3';

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
  const willTranslateInEnglish = session.message.text.includes('english of');

  if(willTranslateInEnglish) {
    
  }
  translate(session.message.text, 'tl').then(text => {
    session.send("You said: %s", text);
  });
});