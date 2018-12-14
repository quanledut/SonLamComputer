const loginUrl = 'http://18.216.184.198/api/users/login'
const deviceURL = 'http://18.216.184.198/api/devices'

postLogin = async (username, password) => {
   try{
    const response = await fetch(loginUrl,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    return response
   }
   catch(err){

   }
}


// devices request
getDevices = async (token) => {
    try{
        const response = await fetch(deviceURL,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authentication': `Bearer ${token}`
            }
        })
        console.log(response)
        return response 
    }
    catch(err){

    }
}

export const API = {
    postLogin,
    getDevices
}