// Contributor(s): Juho Hyödynmaa
//
// Connection to the database and definition of book data.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = process.env.MONGODB_URI

console.log('connecting to MongoDB...')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// määritellään kirjadatan muoto
const bookSchema = new mongoose.Schema({
  book_id: String,
  reviews: [
    { 
      writer: String,
      book_id: String,
      book_title: String,
      reviewtext: String,
      stars: Number,
      date: Date
    }
  ],
})

bookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Book', bookSchema)
