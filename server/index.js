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

app.post('/post', async (req, res) => {
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

app.get('/read', async (req, res) => {
  Student.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result)
  })
})

// app.put('/update', async (req, res) => {
//   const name = req.body.name
//   const newName = req.body.newName
//   const id = req.body._id
//   try {
//     await Student.findById(id, (error, result) => {
//       result.name = newName
//       result.save()
//     })
//   } catch (err) {
//     console.log(err)
//   }
// })

app.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  await Student.findByIdAndRemove(id).exec()
  res.send('item deleted')
})

app.listen(3000, () => {
  console.log('server started on 3000')
})
