const request=require('request');
const geocode=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFodWwyMjEwMDciLCJhIjoiY2xpcThtZzR4MDB2dDNocGtjbzh1OG1jdSJ9.0iro5NdDUT7R5OPmIcc9mQ&limit=1';
    request({url:url,json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to location service',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('unable to find the location.Try another search.',undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode;