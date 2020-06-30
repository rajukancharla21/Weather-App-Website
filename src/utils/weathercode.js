const request= require('request')

const weathercode=(latitude,longitude,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=79bd5a4a9c667db336018e6696028ad3'
    request({url:url,json:true},(error,response)=>{
    if(error){
        callback("Unable to connect to weather Service!",undefined)
    }else if(response.body.error){
        callback("Unable to find Location!",undefined)

    }else{
        callback(undefined,{
            weather:response.body.weather,
            temperatue:response.body.main.temp,
            country: response.body.sys.country,
            wind: response.body.wind.speed
        })
        
    }
    
})
}
module.exports = weathercode