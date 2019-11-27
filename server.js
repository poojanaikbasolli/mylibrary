const express = require('express')
  const app = express()
  const expressLayouts = require('express-ejs-layouts')
  const mongoose = require('mongoose')
  const indexRouter = require('./routes/index')
  
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views')
  app.set('layout', 'layouts/layout')
  app.use(expressLayouts)
  app.use(express.static('public'))
  
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
  
  app.listen(process.env.PORT || 3000)