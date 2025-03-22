import express from 'express'
import sieg from '../Sieg/index.js'

const port = 8000
const app = express()

app.use(express.json())

app.post('/start', (req, res) => {
    res.status(200).json(
        sieg(req.body)
    )
})

app.listen(port, (error) => {
    if (error) {
        console.log("deu erro")
        return
    }
    console.log("Servidor conectado!")
})





