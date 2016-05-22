'use strict';

const fs = require('fs');
const path = require( 'path' );
const jokesFile = path.join(__dirname, 'jokes.json');

const TeleBot = require('telebot');
const TeleKey = process.env.TELEGRAM_API_KEY || fs.readFileSync(path.join(__dirname, '.env'), "utf8");
const bot = new TeleBot(TeleKey);

// Command keyboard
const markup = bot.keyboard([
  ['/joke']
], { resize: true, once: false });


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
  let joke = getJoke();

  console.log('Sending Joke %s to %s', joke.k, id);
  return bot.sendMessage(id, joke.text);
});

bot.connect();


function getJoke() {
	let content = fs.readFileSync(jokesFile, 'utf8');
	let jokes = JSON.parse(content);
	let rand = randomInt(0,99);

	return jokes[rand];
}


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}