const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const socketIo = require('socket.io')
const cors = require('cors')

const routes = require('./routes')
const {authentication} = require('./middlewares/authMiddleware')

const PORT = process.env.PORT || 3030

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(cors())
app.use(express.json())
app.use(authentication)
app.use(routes)

io.on('connection', (socket) => {
    console.log('A user connected')
    const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)

    const displayTime = now => {
        const h = `0${now.getHours()}`.slice(-2)
        const m = `0${now.getMinutes()}`.slice(-2)
        const s = `0${now.getSeconds()}`.slice(-2)

        return `${h}:${m}:${s}`
    }

    const makePrice = () => ({
        open: +`1.${randomNum(1234, 7896)}`,
        highest: +`1.${randomNum(1234, 7896)}`,
        lowest: +`1.${randomNum(1234, 7896)}`,
        close: +`1.${randomNum(1234, 7896)}`,
        time: new Date().getTime()
    })

    let time = new Date().getTime()
    socket.emit('priceHistory', {
        pairs: {
            EURUSD: Array.from(Array(20)).map(p => ({
                ...makePrice(),
                time: time -= 1000
            })).reverse()
        }
    })

    socket.emit('priceUpdate', {
        pairs: {
            EURUSD: makePrice()
        }
    })

    setInterval(() => {
        const decimals = randomNum(1234, 7896)

        socket.emit('priceUpdate', {
            pairs: {
                EURUSD: makePrice()
            }
        })
    }, 1000)

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

app.all('*', (req, res) => {
    res.status(404).send({ok: false})
})

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/dashboard-tool')

const devServer = app.listen(PORT, () => `Server is listening on port ${PORT}...`)
const serverIo = server.listen(3031, () => `Server is listening on port ${3031}...`)

module.exports = devServer