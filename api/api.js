'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fs = require('fs-extra')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = 8081

const router = express.Router()

const cors = 'Access-Control-Allow-Origin'

mongoose.connect('mongodb://localhost/cruises', {useMongoClient: true})
const ApiHost = require('./models/apihost')
const Cruise = require('./models/cruise')

let data = fs.readJsonSync('../data/apihost.json')
console.log(JSON.stringify(data, null, 2))
let apihost = new ApiHost({
  host: data.host,
  port: data.port,
  origin: data.origin
})
apihost.save(function (err) {
  if (err) {
    console.log(err)
  }
})
const origin = `${apihost.host}:${apihost.origin}`

data = fs.readJsonSync('../data/cruises.json')
console.log(JSON.stringify(data, null, 2))
for (let i = 0; i < data.length; i++) {
  let cruise = new Cruise({
    cid: data[i].id,
    from: data[i].from,
    dest: data[i].dest,
    date: data[i].date
  })
  cruise.save(function (err) {
    if (err) {
      console.log(err)
    }
  })
}

router.get('/', function (req, res) {
  res.setHeader(cors, origin)
  res.json({message: 'Welcome to Cruises service!'})
})

router.route('/cruises')
.get(function (req, res) {
  res.setHeader(cors, origin)
  Cruise.find().limit(6).sort({cid: 1}).exec(function (err, cruises) {
    if (err) {
      res.send(err)
    }
    res.json(cruises)
  })
})

router.route('/cruises/:cruise_id')
.get(function (req, res) {
  res.setHeader(cors, origin)
  Cruise.findOne({cid: req.params.cruise_id}, function (err, cruise) {
    if (err) {
      res.send(err)
    }
    res.json(cruise)
  })
})

router.route('/cruises/range/:first_cruise/to/:last_cruise')
.get(function (req, res) {
  res.setHeader(cors, origin)
  Cruise.find({cid: {$gt: parseInt(req.params.first_cruise), $lt: parseInt(req.params.last_cruise)}})
  .limit(6).sort({cid: 1}).exec(function (err, cruises) {
    if (err) {
      res.send(err)
    }
    res.json(cruises)
  })
})

router.route('/cruises/from/:cruise_from')
.get(function (req, res) {
  res.setHeader(cors, origin)
  Cruise.find({from: req.params.cruise_from}).limit(6).sort({cid: 1}).exec(function (err, cruises) {
    if (err) {
      res.send(err)
    }
    res.json(cruises)
  })
})

router.route('/robots.txt')
.get(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  let robots = []
  robots.push('User-agent: *')
  robots.push('Disallow: /')
  res.send(robots.join('\n'))
})

router.route('/cruises/to/:cruise_dest')
.get(function (req, res) {
  res.setHeader(cors, origin)
  Cruise.find({dest: req.params.cruise_dest}).limit(6).sort({cid: 1}).exec(function (err, cruises) {
    if (err) {
      res.send(err)
    }
    res.json(cruises)
  })
})

app.use('/', router)

app.listen(port)
console.info('API server listening on port ' + port)
ApiHost.remove({}, function (err) {
  if (err) {
    console.log(err)
  }
})

Cruise.remove({}, function (err) {
  if (err) {
    console.log(err)
  }
})
