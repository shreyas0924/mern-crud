const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Student = require('./models/model')

require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://localhost:27017/student')

app.post('/api/details', async (req, res) => {
  console.log(req.body)

  try {
    await Student.create({
      name: req.body.name,
      email: req.body.email,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    console.log(err)
    res.json({ status: 'error', error: 'duplicate email' })
  }
})

// app.post('/api/login', async (req, res) => {
//   const user = await User.findOne({
//     email: req.body.email,
//     password: req.body.password,
//   })

//   if (user) {
//     const token = jwt.sign(
//       {
//         name: user.name,
//         email: user.email,
//       },
//       'secret123'
//     )

//     return res.json({ status: 'ok', user: token })
//   } else {
//     return res.json({ status: 'error', user: token })
//   }
// })

app.listen(3000, () => {
  console.log('server started on 3000')
})
