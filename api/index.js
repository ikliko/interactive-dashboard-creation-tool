const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')
const {isAuth, authentication} = require('./middlewares/authMiddleware')

const PORT = process.env.PORT || 3030

const app = express()

app.use(express.json())
app.use(authentication)
app.use(routes)

app.get('/test', isAuth, (req, res) => res.send({ok: true}))

app.all('*', (req, res) => {
    res.status(404).send({ok: false})
})

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1/dashboard-tool')

const server = app.listen(PORT, () => `Server is listening on port ${PORT}...`)
module.exports = server