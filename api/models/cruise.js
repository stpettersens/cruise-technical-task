'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CruiseSchema = new Schema({
  cid: Number,
  from: String,
  dest: String,
  date: Date
})

module.exports = mongoose.model('Cruise', CruiseSchema)
