import axios from 'axios'

export const discordSendMessage = (bid, status, prevBid=null) => {
    var params = {}
    if (status === 'sell')
        params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `☠️ <@${bid.userId}>, отчислил игрока **${bid.playerName}**! Сумма: **${bid.curPrice}** монет.`
        }
    else if (status === 'finished')
        params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `✅ <@${bid.userId}>, завершил трансфер игрока **${bid.playerName}**! Сумма: **${bid.curPrice}** монет. _[${new Date(bid.date).toLocaleTimeString('ru-RU')}]_`
        }
    else if (status === 'rebid')
        params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `⚔️ <@${bid.userId}>, перебил бид <@${prevBid.userId}> по игроку **${bid.playerName}**! Сумма: **${bid.curPrice}** монет. _[${new Date(bid.date).toLocaleTimeString('ru-RU')}]_`
        } 
    else if (status === 'buy')
        params = {
            username: "Miles Jacobson Jr.",
            avatar_url: "https://pbs.twimg.com/media/Dy5aICuW0AAJn5x.jpg",
            content: `☑️ <@${bid.userId}>, сделал бид по игроку **${bid.playerName}**! Сумма: **${bid.curPrice}** монет. _[${new Date(bid.date).toLocaleTimeString('ru-RU')}]_`
        }

    axios({
        method: 'post',
        //main discord
      //  url: 'https://discordapp.com/api/webhooks/639209744195780620/Oxr4NBpM3186OVHcuT2tuozq8Z5o8cmICHRw88-xtk_hY0A3dMK1lFuqo-3bPt5N-OSZ',
        //test discord
        url: 'https://discordapp.com/api/webhooks/762805897507373096/AKGxHCc4nVgJo7AlGEea-7dZBNn6p8uE6fU9jdSx_zG_p6v2hSpg0t9D8Zq1Tw7yNj7s',
        headers: {"Content-Type": "application/json"},
        data: params
    }).then(() => {
        console.log('Message was sended!')
    })
}