var google = require('google');

module.exports = function (scriptLoader) {
    scriptLoader.on('command', ['g', 'google'], function (event) {
        if (event.params.length > 0) {
            google(event.text, function (error, next, links) {
                if (!error) {
                    if (links.length > 0) {
                        event.channel.reply(event.user, links[0].title + ' (' + links[0].link + ')');
                    } else {
                        event.channel.reply(event.user, 'Your search - ' + event.text + ' - did not match any documents.');
                    }
                } else {
                    event.channel.reply(event.user, 'Gratz. You broke it. (' + error + ') ');
                    scriptLoader.debug('%s', error);
                }
            });
        } else {
            event.user.notice('Use: !google <query>');
        }
    });
};