
// function to check inputs in tweet's text

function checkTweet(body, keys) {
    let result = true
    for (const input of keys){
        if(!body[input] || body[input]=== ""){
            result = false
        }
    }
    return result
}

module.exports = {checkTweet}