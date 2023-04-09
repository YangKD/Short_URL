// load mongoose 
const mongoose = require('mongoose')

// use dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect mongoose
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// get connect state
const db = mongoose.connection
// connect error
db.on('error', () => {
  console.log('mongodb error!')
})
// connect sucess
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db

