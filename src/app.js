const path=require('path')
const express=require('express');
const hbs =require('hbs');

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

const app=express();



//Define paths for express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
console.log(viewsPath)

//setup handlbars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Rahul'
    })
})

app.get('/help',(req,res)=>{
    res.render('Help',{
        helpText:'This is some helpful text.',
        title:'Help',
        name:'Rahul'

    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rahul'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide an address!"
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error)
        {
       
            //return  console.log(error);
            return res.send({
                error:error
            })
    
        }
    
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error)
            {
                  return res.send({
                    error:error
                })
            }
            res.send({
                forecast:forecastData,
                location:data.location,
                address:req.query.address
                
            })
        //   console.log(data.location);
        //   console.log(forecastData);
            
        })
    
    })
})

app.get('/products',(req,res)=>
{
   if(!req.query.search)
   {
    return  res.send({
        error:'You must provide a search term!'
    })
   }


    console.log(req.query);
    res.send({
        products:[]
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
       title:'404',
       name:'rahul' ,
       errorMessage:'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
       title:'404',
       name:'rahul' ,
       errorMessage:'page not found.'
    })
})



app.listen(3000,()=>{
    console.log('server is up on port 3000');
})