const request=require('request');

const forecast=(latitude,longitude,callback)=>
{
    const url='http://api.weatherstack.com/current?access_key=c734f32a5732f27e093f42f6f8d81861&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
   request({url:url,json:true},(error,response)=>{
    //console.log(response.body);
    if (error) {
        callback('Unable to connect the Weather Server!', undefined);
    } else if (response.body.error) {
        callback('Unable to find weather for this location', undefined);
    } 
    else{
        callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.And feels like "+response.body.current.feelslike);
    }
   })
}
module.exports=forecast;