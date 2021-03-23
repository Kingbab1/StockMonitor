const express = require('express')

const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
    var date = new Date()
    res.send('Server Up: Date [ ' + date.getDate() + '/' + (date.getMonth()+ 1) 
    + '/' + date.getFullYear() + ' >>>  ' + date.getHours() + ':' + date.getMinutes() 
    + ' ]')
})

app.get('/', (req, res) => {
    var date = new Date()
    res.send()
})

app.listen(port, () => {
    console.log("serceris running on port [" + port + "]")
})