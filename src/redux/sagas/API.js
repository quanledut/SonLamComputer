import {AsyncStorage} from 'react-native'
const loginUrl = 'http://18.216.184.198/api/users/login'
const deviceURL = 'http://18.216.184.198/api/devices'
const deviceTypeUrl = 'http://18.216.184.198/api/deviceTypes?page=1&limit=100'
const serviceFixUrl = 'http://18.216.184.198/api/serviceFix'
const serviceSellUrl = 'http://18.216.184.198/api/serviceSell'
const userUrl = 'http://18.216.184.198/api/users/'

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
getDevices = async (token, deviceType, page) => {
    try{
        const response = await fetch(`${deviceURL}?page=${page}&limit=10`+(deviceType!='All'?`&string=${deviceType}`:``),{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        return response 
    }
    catch(err){

    }
}

getDeviceById = async (deviceID) => {
    try{
        console.log('deviceIDURL'+ `${deviceURL}/${deviceID}`)
        const response = await fetch(`${deviceURL}/${deviceID}`,{
            method:'GET',
            headers:{
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
                'Authorization': `Bearer ${token}`
            }
        })
        return response
    }
    catch(err){

    }
}

//service
getServiceSell = async (token) => {
    try{
        const response = await fetch(serviceSellUrl,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        return response
    }
    catch(err){

    }
}

getServiceFix = async (token) => {
    try{
        const response = await fetch(serviceFixUrl,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        return response
    }
    catch(err){

    }
}

//user 
getUserById = async (userId) => {
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`${userUrl}/${userId}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        return response
    }
    catch(err){

    }
}

export const API = {
    postLogin,
    getDevices,
    getDeviceType,
    getServiceFix,
    getServiceSell,
    getDeviceById,
    getUserById
}