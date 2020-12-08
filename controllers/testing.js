// Contributor(s): Esa Mäkipää
//
// Esa Mäkipää: Olen hyödyntänyt Full stack open 2020 -kurssilla
// (Helsingin yliopisto) oppimiani asioita
// Lähde:
// Full stack open 2020 (https://fullstackopen.com/),
// Syväsukellus moderniin websovelluskehitykseen (osat 0-8),
// kurssimateriaali on lisensoitu Creative Commons BY-NC-SA 3.0 -lisenssillä
// https://creativecommons.org/licenses/by-nc-sa/3.0/ 
// 
// Kuvaus: määrittelee routen tietokannan alustamiseen testimoodissa.
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const testRouter = require('express').Router()
const Book = require('../models/book')
const User = require('../models/user')

// route tietokannan alustamiseen testimoodissa
testRouter.post('/reset', async (request, response) => {
  await Book.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testRouter