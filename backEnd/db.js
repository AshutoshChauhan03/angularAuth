require('dotenv').config()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: "true"}, err => {
    if(err)
        console.log("<<< __________ MONGODB CONNECTION FAILED __________ >>>");
    else
        console.log("<<< __________ MONGODB CONNECTED __________ >>>");
})

module.exports = mongoose.connection