'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ApiHostSchema = new Schema({
  host: String,
  port: Number,
  origin: Number
})

module.exports = mongoose.model('ApiHost', ApiHostSchema)
