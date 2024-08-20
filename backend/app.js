const express = require("express")
const app = express()
const cors = require('cors');

require('dotenv').config()

const itemsRouter = require('./router/items.router')
const customersRouter = require('./router/customers.router')
const usersRouter = require('./router/user.router');
const purchasesRouter = require('./router/purchase.router')
const invoicesRouter = require('./router/invoices.router')
const salesRouter = require('./router/sales.router')


app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Middle ware

app.use(cors({
    origin: 'http://127.0.0.1:5501'
}));

app.use("/api/items", itemsRouter)
app.use("/api/customers", customersRouter)
app.use("/api/purchases", purchasesRouter)
app.use("/api/invoices", invoicesRouter)
app.use("/api/sales", salesRouter)


app.use("/api/auth", usersRouter)

app.listen(3000, ()=>{
    console.log('server running')
})