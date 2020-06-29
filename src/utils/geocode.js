const request=require('request')
const geocode=(address,callback)=>{
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoicmFqdWthbmNoYXJsYSIsImEiOiJja2J6YTRqYjQwbTdqMnRxYm80N3V5aHNsIn0.oyZbrG1IonaAWDh7qhl8MA'
    if(!address){
        console.log('Please Provide Address..')
    }
    else{
    request({url:geocodeURL,json:true},(error,response)=>{
        if(error){
            callback("Unable to Connect Map Service!",undefined)
        }else if(response.body.features.length==0){
            callback("Unable to Find location Try again..",undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}
}
module.exports= geocode