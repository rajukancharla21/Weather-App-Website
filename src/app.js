const path=require('path')
const hbs=require('hbs')
const express=require('express')
const app=express()
const publicPath= path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partial')
const geocode=require('./utils/geocode')
const weathercode=require('./utils/weathercode')
app.use(express.static(publicPath))
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.set('view engine','hbs')
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Raju"
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"Raju"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        name:"Raju"

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Date must be provided"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        weathercode(latitude,longitude,(error,data)=>{
            if(error){
                return res.send({error})
            }
            else{
                res.send({
                    forecast:data.weather[0].description+' in '+location+' with '+data.temperatue+' F Temperature',
                    address:req.query.address
                })
            }
        })
    })

})
app.get('*',(req,res)=>{
    res.send("404 Error")
})
app.listen(3000,()=>{
    console.log("Server is Up..")
})