require('dotenv').config()

const express = require('express')
const api = require('./routes/api')
const cors = require('cors')

const app = express()
app.use(cors())

// routes
app.use('/', api)


app.listen(process.env.EXPRESS_PORT, ()=> {
    console.log(`<<<---------Express Server UP on ${process.env.EXPRESS_PORT}--------->>>`)
})