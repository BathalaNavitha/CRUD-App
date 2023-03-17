const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/connection')

const app = express()
dotenv.config({path:'config.env'})
const PORT = process.env.PORT|| 3000




//log request
app.use(morgan('tiny'))


//mongodb connection
connectDB();


//parser request to body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

//set view engine
app.set("view engine", "ejs")
//app.set("views",path.resolve(__dirname,"views/ejs")) if u create any ejs files(ref)

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))//css/style.css if u create style.css file
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//load routers
app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`server is running on http://localhost:${PORT}`)});