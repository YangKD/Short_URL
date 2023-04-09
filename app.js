// import express and build server
const express = require('express')
const app = express()
// import handlebars
const exphbs = require('express-handlebars')
// import mongoose
require("./config/mongoose")
// import URL models
const URL = require("./models/URL")
const shortenURL = require("./utils/shortenURL")


// use dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// setting port
const port = 3000

// set body-parser
app.use(express.urlencoded({ extended: true }))
// set engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))


// setting root 
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req,res) => {
  if (!req.body.url) return res.redirect('/')
  const shortURL = shortenURL(5)

  URL.findOne({ originalURL: req.body.url })
    .then(data => 
      data ? data : URL.create({ shortURL, originalURL : req.body.url }))
    .then(data => 
      res.render('index', {
        origin: req.headers.origin,
        shortURL: data.shortURL,
      })
    )
    .catch(err => console.log(err))
})

// setting shortURL route
app.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params

  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render('error', {
          errorMsg: "Can't find the URL",
          errorURL: req.headers.host + '/' + shortURL,
        })
      }
      res.redirect(data.originalURL)
    })
    .catch(err => console.log(err))
})

// setting listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})