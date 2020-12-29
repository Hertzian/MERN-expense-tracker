const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const connectDb = require('./config/connectDb')

dotenv.config({ path: './config/.env' })

connectDb()

// mount routes
const transactions = require('./routes/transactionsRoutes')

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

// routes
app.use('/api/v1/transactions', transactions)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode, on port ${PORT}`.yellow
      .bold
  )
)
