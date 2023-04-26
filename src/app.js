const express = require('express')
const db = require('./models/index')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) =>{
    res.status(200).json({
        result: 'success',
        message:"Hello from reunion app"
    })
})


module.exports = app