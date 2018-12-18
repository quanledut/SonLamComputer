const loginUrl = 'http://18.216.184.198/api/users/login'
const deviceURL = 'http://18.216.184.198/api/devices'
const deviceTypeUrl = 'http://18.216.184.198/api/deviceTypes?page=1&limit=100'

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
        return response 
    }
    catch(err){

    }
}

// deviceType
getDeviceType = async (token) => {
    try{
        response = await fetch(deviceTypeUrl,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authentication': `Bearer ${token}`
            }
        })
        //await console.log(response)
        return response
    }
    catch(err){

    }
}

export const API = {
    postLogin,
    getDevices,
    getDeviceType
}