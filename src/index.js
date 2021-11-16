const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express()

const router = require('./Routes/Router')

const dbUri = process.env.DB_URI
mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.use(cors())

app.use(express.json())
app.use(router)

app.listen(app.listen(process.env.PORT || 3333))