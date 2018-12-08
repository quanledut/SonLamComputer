const loginUrl = ''

function* postLogin(username, password){
    const response = yield fetch(loginUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    console.log(JSON.stringify(response))
    return yield response
}

export const API = {
    postLogin
}