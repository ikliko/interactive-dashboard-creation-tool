const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

const server = app.listen(PORT, () => `Server is listening on port ${PORT}...`)

module.exports = server