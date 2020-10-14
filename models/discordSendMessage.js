const axios = require('axios').default

const discordSendMessage = (bid, status) => {
    
        var params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `✅ <@${bid.userId}>, завершил трансфер игрока **${bid.playerName}**! Сумма: **${bid.curPrice}** монет.` }

    axios({
        method: 'post',
        url: 'https://discordapp.com/api/webhooks/639209744195780620/Oxr4NBpM3186OVHcuT2tuozq8Z5o8cmICHRw88-xtk_hY0A3dMK1lFuqo-3bPt5N-OSZ',
      //    url: 'https://discordapp.com/api/webhooks/762805897507373096/AKGxHCc4nVgJo7AlGEea-7dZBNn6p8uE6fU9jdSx_zG_p6v2hSpg0t9D8Zq1Tw7yNj7s',
        headers: {"Content-Type": "application/json"},
        data: params
    }).then(() => {
        console.log('Message was sended!')
    })
}

module.exports = discordSendMessage