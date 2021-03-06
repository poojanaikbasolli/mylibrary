const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const mongoose = require('mongoose')
  const bodyParser = require('body-parser')
  const methodOverride = require('method-override')
  
  const indexRouter = require('./routes/index')
  const authorRouter = require('./routes/authors')
  const bookRouter = require('./routes/books')


  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(methodOverride('_method'))
  app.use(express.static('public'))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
  
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));
  
  app.use('/', indexRouter)
  app.use('/authors', authorRouter)
  app.use('/books', bookRouter)

  
  app.listen(process.env.PORT || 3000)