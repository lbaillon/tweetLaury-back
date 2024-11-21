
// function to check inputs in tweet's text

function checkTweet(body, keys) {
    console.log("coucou")
    let result = true
    for (const input of keys){
        console.log(body[input])
        if(!body[input] || body[input]=== ""){
            result = false
        }
    }
    return result
}

module.exports = {checkTweet}