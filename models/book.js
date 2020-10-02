//Contributor(s): Juho Hyödynmaa
//
//Connection to the database and definition of book data

const mongoose = require('mongoose')
//const uniqueValidator = require('mongoose-unique-validator')

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

/*
//Tätä ei tarvita, on nyt vielä, jos tarvitsemme esim. tietojen validointia 
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true ,
    minlength: 8
  }
})
*/

//personSchema.plugin(uniqueValidator)