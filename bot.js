const Discord = require('discord.js');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var user_id = "314976210171985920"; // Dai's user id
var suppression_count = 0;

// Initialize Discord Bot
var client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.id != user_id) {
        return
    }

    var result = sentiment.analyze(msg.content)

    if (result.score >= 5) {
        suppression_count += 1;
        msg.delete(1000);
        msg.channel.send(`Dai has been too positive. ${suppression_count} message(s) suppressed.`);
    }
});

client.login(process.env.BOT_TOKEN);