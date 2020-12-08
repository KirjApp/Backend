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
// Kuvaus: Backend-sovelluksen testaaminen REST APIn tasolta (testeissä käytetään tietokantaa).
// Testejä, jotka käyttävät useita sovelluksen komponentteja yhtäaikaa, voidaan luonnehtia integraatiotesteiksi.
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Book = require('../models/book')
// supertest-kirjasto
const api = supertest(app)
// kirjadata testaukseen
const initialBooks = [
  {
    _id: '5fb14c46ac5a3009c9906150',
    book_id: 'e7D-mITABmEC',
    reviews: [
      {
        _id: '5fc08c7d907a5f0540611bb9',
        writer: 'Writer1',
        book_id: 'e7D-mITABmEC',
        book_title: 'Core PHP Programming',
        reviewtext: 'Test1',
        stars: 3.0,
        date: '2020-11-27T05:19:57.240+00:00'
      },
      {
        _id: '5fc08c7d907a5f0540611bb8',
        writer: 'Writer2',
        book_id: 'e7D-mITABmEC',
        book_title: 'Core PHP Programming',
        reviewtext: 'Test2',
        stars: 4.0,
        date: '2020-11-27T06:30:45.280+00:00'
      }
    ],
    __v: 0
  },
  {
    _id: '5fb14c46ac5a3009c9906170',
    book_id: 'Dd9CAAAAIAAJ',
    reviews: [
      {
        _id: '5fc08c7d907a5f0540611bb9',
        writer: 'Writer1',
        book_id: 'Dd9CAAAAIAAJ',
        book_title: 'John Steinbeck',
        reviewtext: 'Test1',
        stars: 2.0,
        date: '2020-11-29T15:52:10.426+00:00'
      }
    ],
    __v: 0
  },
]

// testikannan (MongoDB) alustus ennen jokaista testiä
beforeEach(async () => {
  await Book.deleteMany({})
  let bookObject = new Book(initialBooks[0])
  await bookObject.save()
  bookObject = new Book(initialBooks[1])
  await bookObject.save()
})

// API GET -testit
describe('API GET tests', () => {
  // kirjadata palautetaan JSON-muotoisena tietokannasta (MongoDB)
  test('books are returned as json', async () => {
    await api
      .get('/api/myBooks')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})