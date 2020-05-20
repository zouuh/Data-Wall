const express = require('express')
const app = express()
const serv = require('http').Server(app)
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


// Allow CORS
app.use((req, res, next) => {
    //console.log(req)
    res.header('Access-Control-Allow-Origin', '*')
    req.header('Access-Control-Allow-Origin', '*')

    next()
})

const PORT = process.env.PORT || 2000
serv.listen(PORT, () => console.log(`Server started on port $ { PORT }`))

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectID
const client = new MongoClient('mongodb+srv://melizouh:melizouh@datawallcluster-nct4u.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).connect()

const dbRequest = (req) => {
    try {
        client.then((client) => {
            const db = client.db('DataWall')
            req(db)
        })
    } catch (err) {
        console.log('-----Error while connecting to database-----')
        console.log(err)
        console.log('-------------------------')
    }
}

app.get('/get', (req, res) => {
    dbRequest(db => {
        db.collection('datas').find({}).toArray((err, result) => {
            if (err) {
                console.log('ERR')
                res.json(err)
            } else {
                res.json(result)
            }
        })
    })
})

app.post('/post', (req, res) => {
    console.log('bob')
    dbRequest(db => {
        console.log(req.body)
        db.collection('datas').insertOne({ chemin: req.body.chemin })
        res.send('truc à la con')
    })
})