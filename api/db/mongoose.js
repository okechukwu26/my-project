const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DATA_BASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

