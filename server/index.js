require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env
const {seed, getFoods, getBabies, createBaby, deleteBaby} = require('./controller.js')

app.use(express.json())
app.use(cors())


app.post('/seed', seed)



app.get('/foods', getFoods)


app.post('/babies', createBaby)
app.get('/babies', getBabies)
app.delete('/babies/:id', deleteBaby)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))