const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// määritellään käyttäjädatan muoto
const userSchema = new mongoose.Schema({
  username: String{
    type: String,
    required: true,
    minlength: 3	
  },
  passwordHash: String,
  reviews: [
    { 
      writer: String,
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