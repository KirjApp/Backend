// Contributor(s): Juho Hyödynmaa
//
// Definition of user data.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// määritellään käyttäjädatan muoto
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3	
  },
  passwordHash: String,
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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
