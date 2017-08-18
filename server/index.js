const https = require('https')
const http = require('http')

const app = require('express')()
const server = http.Server(app)
const io = require('socket.io')(server)

const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:8080'
}))

const api = require('./api')

app.get('/', (req, res) => {
    res.send('Hello World from Docker!')
})

app.use('/api', api)

io.on('connection', socket => {
    console.log('socket sonnected')
})

server.listen(8000, () => {
    console.log('listening on port 8000...')
})
