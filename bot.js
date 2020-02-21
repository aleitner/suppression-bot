const Discord = require('discord.js');
var Sentiment = require('sentiment');
var sentiment = new Sentiment();
var user_id = "314976210171985920"; // Dai's user id

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

    msg.channel.send(`<@${user_id}> message sentiment analysis: ${result.comparative}`);

    if (result.comparative > 1) {
        msg.channel.send(`<@${user_id}> has been very positive. Are you sure what you are saying is genuine and sincere?`);
    } else if (result.comparative > 4) {
        msg.delete(1000);
        msg.channel.send(`<@${user_id}> has been too positive. ${suppression_count} message(s) suppressed.`);
    } else if (result.comparative < -1 ) {
        msg.channel.send(`That was quite negative <@${user_id}> are you feeling okay today?`);
    } 
});

client.login(process.env.BOT_TOKEN);