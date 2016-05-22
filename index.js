'use strict';

const fs = require('fs');
const path = require( 'path' );
const jokesFile = path.join(__dirname, 'jokes.json');

const TeleBot = require('telebot');
const bot = new TeleBot(proccess.env.TELEGRAM_API_KEY);

// Command keyboard
const markup = bot.keyboard([
  ['/joke']
], { resize: true, once: false });


// Log every text message
bot.on('text', function(msg) {
	console.log('[text] ${ msg.chat.id } ${ msg.text }');
	return bot.sendMessage(msg.chat.id, 'You said: ${ msg.text }');
});

// On command "start" or "help"
bot.on(['/start', '/help'], function(msg) {

  return bot.sendMessage(msg.chat.id,
    'Use commands: /joke and /about', { markup }
  );

});

// On command "about"
bot.on('/about', function(msg) {

  let text = 'Jok3sBot is powered by TeleBot library';

  return bot.sendMessage(msg.chat.id, text);

});


// On command "joke"
bot.on('/joke', function(msg) {
  let id = msg.from.id;
  let text = getJoke();
  return bot.sendMessage(id, text);
});

bot.connect();


function getJoke() {
	let content = fs.readFileSync(jokesFile, 'utf8');
	let jokes = JSON.parse(content);
	let rand = randomInt(0,99);

	return jokes[rand]['text'];
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}