//Packages
const Discord = require('discord.js');
const tea = require('mta-tea');
const client = new Discord.Client();
//Config
const config = require('./config.json');
//Code
client.on('ready', () => {
    console.log(`Let's decode! Logged in as ${client.user.tag}!`);
    client.user.setActivity('!help')
});

client.on("message", async message => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    if (message.content.startsWith(config.prefix)) {

        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        if (command == 'encode') {
            var key1 = config.key1;
            var key2 = config.key2;
            var key3 = config.key3;
            var key4 = config.key4;
            if (args.length < 1) {
                return message.channel.send('Please specify an argument! For example: **!encode SuperSecretPass123**.')
            }
            var encoded1 = tea.encode(args.join(' '), key1);
            var encoded2 = tea.encode(args.join(' '), key2);
            var encoded3 = tea.encode(args.join(' '), key3);
            var encoded4 = tea.encode(args.join(' '), key4);
            return message.channel.send(`**Method 1**: ${encoded1} \n**Method 2**: ${encoded2} \n**Method 3**: ${encoded3} \n**Method 4**: ${encoded4}`)
        }
        if (command == 'decode') {
            var key1 = config.key1;
            var key2 = config.key2;
            var key3 = config.key3;
            var key4 = config.key4;
            if (args.length < 1) {
                return message.channel.send('Please specify an argument! For example: **!decode oAEB59aC9jLJI4nD+ybnnrAvJm4/yFYS**.')
            }
            var decoded1 = tea.decode(args[0], key1);
            var decoded2 = tea.decode(args[0], key2);
            var decoded3 = tea.decode(args[0], key3);
            var decoded4 = tea.decode(args[0], key4);
            if(!decoded1) {
                return message.channel.send('You provided wrong encoded password!')
            }
            return message.channel.send(`**Method 1**: ${decoded1} \n**Method 2**: ${decoded2} \n**Method 3**: ${decoded3} \n**Method 4**: ${decoded4}`)
        }
        if (command == 'help') {
            return message.channel.send('**MTA Bot CMDs**: \n!encode \n!decode \n**NOTE**: If the methods are empty, you provided the wrong encoded password.')
        }
    }
});

//Logging
client.login(config.token);