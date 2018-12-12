const loginUrl = 'http://18.216.184.198/api/users/login'

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
    return yield response
}

export const API = {
    postLogin
}