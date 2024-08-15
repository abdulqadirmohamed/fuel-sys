const express = require("express")
const app = express()

require('dotenv').config()

const postsRouter = require('./router/post.router')
const usersRouter = require('./router/user.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use("/api/posts", postsRouter)
app.use("/api/auth", usersRouter)

app.listen(3000, ()=>{
    console.log('server running')
})