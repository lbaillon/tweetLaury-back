


// function to check inputs in username and password

function checkBody(body, keys) {
    let result = true
    for (const input of keys){
        if(!body[input] || body[input]=== ""){
            result = false
        }
    }
    return result
}


module.exports = {checkBody}