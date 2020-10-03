var TurndownService = require('turndown');
var axios = require('axios');
const cheerio = require('cheerio');

function main(reddit) {
    var turndownService = new TurndownService()

    reddit = reddit.replace('www.reddit.com', 'old.reddit.com')
    axios.get(reddit, {
        headers: {
            Referer: reddit,
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then(function (response) {
        const $ = cheerio.load(response.data)
        var md = cheerio.html($(".md")[1]);
        console.log(turndownService.turndown(md));
    });
}

main(process.argv[2])