const express = require("express")
const app = express()

require('dotenv').config()

const postsRouter = require('./routes/post.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/posts", postsRouter)

app.listen(3000, ()=>{
    console.log('server running')
})