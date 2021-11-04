const axios = require('axios').default

const discordSendMessage = (bid) => {
    
        var params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `✅ <@${bid.userId}>, завершил трансфер игрока **${bid.playerName}**! Сумма: **${bid.curPrice}** монет. _[${new Date(bid.date).toLocaleTimeString('ru-RU')}]` }

    axios({
        method: 'post',
        url: process.env.DISCORD_WEBHOOK_URL,
        headers: {"Content-Type": "application/json"},
        data: params
    }).then(() => {
        console.log('Message was sended!')
    })
}

module.exports = discordSendMessage