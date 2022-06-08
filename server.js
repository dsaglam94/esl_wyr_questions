const express = require('express')
const mongoose = require('mongoose')
const question = require('./models/question')
const cors = require('cors')
const app = express()
const PORT = 3000
require('dotenv').config()

const dbConnectionString = process.env.DB_STRING
mongoose.connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('DB connected')
})

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    question.find().sort({ vote: -1 })
    .then(data => {
        res.status(200).render('index.ejs', {info: data})
    })
    .catch(err => {
        console.log(err.message)
    })
})

app.get('/api/questions', (req, res) => {
    const questions = question.find()
    .then(data => {
        console.log(data)
        res.send(data)
    })
})

app.post('/api', async (req, res) => {
   const r = await question.exists({ question: req.body.question})

    if(!r) {
        question.create({ question: req.body.question, vote: 0 })
        .then(result => {
            console.log(result)
            res.status(200).redirect('/')

        })
        .catch(err => {
            console.log(err.message)
        })
    } else {
        res.send('Questions can\'t be same.')
    }
})

app.put('/vote', (req, res) => {
    question.findOneAndUpdate({ question: req.body.question }, {
        $set: {
            vote: Number(req.body.vote) + 1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Vote')
        res.json('Vote Added')
    })
    .catch(err => console.log(err))
})

app.delete('/delete', (req, res) => {
    question.findOneAndDelete({ question: req.body.question })
    .then(result => {
        console.log('Question Deleted')
        res.json('Question Deleted')
    })
    .catch(error => console.error(error.message))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening at port ${PORT}`)
})