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
// Kuvaus: Kirjalistan ja arvostelujen testejä
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const listHelper = require('../utils/list_helper')

// Listassa yksi kirja
const oneBook = [
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
  }
]

// Listassa useampi kirja (tässä tapauksessa kaksi)
const books = [
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
  }
]

// dummy-testi
describe('dummy', () => {
  test('dummy returns one', () => {
    // listassa ei kirjoja
    const books = []
    
    // dummy-funktion tulos
    const result = listHelper.dummy(books)
    // paluuarvon odotetaan olevan 1
    expect(result).toBe(1)
  })
})

// arvostelut yhteensä -testit
describe('total reviews', () => {
  // listassa ei ole kirjoja
  test('of empty book list is zero', () => {
    const result = listHelper.totalReviews([])
    //console.log(result)
    expect(result).toBe(0)
  })

  test('when list has only one book equals the reviews of that', () => {
    // listassa on yksi kirja
    const result = listHelper.totalReviews(oneBook)
    //console.log(result)
    expect(result).toBe(1)
  })

  test('of bigger list is calculated right', () => {
    // listassa on useampi kirja
    const result = listHelper.totalReviews(books)
    //console.log(result)
    expect(result).toBe(3)
  })
})
