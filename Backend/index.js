const express = require('express')

const userRouter = require('./routers/userRouters')
const newsRouter = require('./routers/newsRouter')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const server = express()

server.use(express.json())
server.use(cors())
const PORT = process.env.PORT || 5000;


server.use('/api/users',userRouter)
server.use('/api/news', newsRouter)


server.get('/',(req,res)=>{
    res.status(200).json({message:"Hello World"})
})



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Mongodb connected successfully")
    server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
})
.catch((err)=>{
    console.log(err)
})


