import express from 'express'
import indexRoutes from './routes/index'
import cors from 'cors'


const app = express()

app.use(express.json()) // req.body into json
app.use(express.urlencoded({ extended: true })) // req.body into urlencoded
app.use(cors())




app.use('/', indexRoutes)




const PORT = 3000

app.get('/ping', async (_req, res) => {
    console.log('someone pinged here ')
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
