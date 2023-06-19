import express from 'express'
const app = express()


app.use(express.json()) // req.body into json

const PORT = 3000

app.get('/ping', async (_req, res) => {
    console.log('someone pinged here ')
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
