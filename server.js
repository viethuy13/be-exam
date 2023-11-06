'use strict'

require('dotenv').config()
const app = require('./src/app')

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App running in http://127.0.0.1:${PORT}`)
})
