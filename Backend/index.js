const express = require('express')

const userRouter = require('./routers/userRouters')
const newsRouter = require('./routers/newsRouter')
const mongoose = require('mongoose')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())


server.use('/api/users',userRouter)
server.use('/api/news', newsRouter)


server.get('/',(req,res)=>{
    res.status(200).json({message:"Hello World"})
})



mongoose.connect('mongodb://localhost:27017/newsApp')
.then(()=>{
    console.log("Mongodb connected successfully")
    server.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})
})
.catch((err)=>{
    console.log(err)
})


