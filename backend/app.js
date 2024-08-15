const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()

const postsRouter = require('./router/post.router')
const usersRouter = require('./router/user.router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

app.use("/api/posts", postsRouter)
app.use("/api/auth", usersRouter)

app.listen(3000, ()=>{
    console.log('server running')
})