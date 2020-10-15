// Contributor(s): Juho Hyödynmaa, Esa Mäkipää, Taika Tulonen
// 
// Juho Hyödynmaa: toiminnallisuudet kirjadatan käsittelyyn, 
// kirhajdatan haku ja tallennus MongoDB tietokantaan 
//
// Esa Mäkipää: routejen (tapahtumankäsittelijöiden)
// perusrunko, kirjadatan haku Google Books APIsta
// 
// Taika Tulonen: idea Google Books APIn käytöstä ja alustava
// selvitys toiminnallisuudesta
//
// Kuvaus; määrittelee routet (tapahtumankäsittelijät) kirjadatan
// hakuun sekä kirjaan liityvien arvostelujen hakuun ja tallentamiseen

// dotenv: ympäristömuuttujien määrittelyyn (esim. API KEY, PORT,...), asennus: npm install dotenv --save
require("dotenv").config();
// express: ohjelmointirajapinta/-kirjasto web-sovellusten ohjelmointiin Node:js:llä, asennus: npm install express --save
const express = require("express");
// same origin policy ja CORS (Cross Origin Resource Sharing)
const cors = require("cors");
const app = express();
// Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0, ä
// API Keys and JWT tokens is included, asennus: npm install googleapis
const { google } = require("googleapis");

app.use(cors());

const books_api_key = process.env.BOOKS_API_KEY;

// kirja
const Book = require('./models/book')

// staattisen sisällön näyttämiseen ja JavaScriptin lataamiseen,
// tarkastaa löytyykö build-hakemsitoa
app.use(express.static('build'))

app.use(express.json())

const books = google.books({
  version: "v1",
  auth: `${books_api_key}`
});

// määritellään routet

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen juureen eli
// polkuun / tulevia HTTP GET -pyyntöjä
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/books
// tulevia HTTP GET -pyyntöjä (kirjadatan haku Google Books APIsta)
app.get("/api/books", (req, res) => {
  let query = req.query.q;
  let maxResults = req.query.maxResults;
  let projection = req.query.projection;
  const params = {
    // hakusana
    q: query,
    // ladattavien kirjojen formaatti
    //download = 'epub',
    // tulosten suodatus (partial, full, free-ebooks, paid-ebooks, ebooks)
    //filtering: 'full',
    // tulosten maksimimäärä
    maxResults: maxResults,
    // printType (all, books, magazines)
    //printType: 'all',
    // kirjan tiedoista näytettävät kentät: 'full' = kaikki, 'lite' = rajoitettu osa
    projection: projection,
    // lajittelu (relevance, newest)
    sorting: 'relevance'
  };
  // haetaan hakuehdon täyttävät kirjat
  books.volumes
    .list(params)
    .then((books) => {	  
      // tuloslistaus localhostiin
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
    });
});

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
// tulevia HTTP GET -pyyntöjä
// kaikkien kirojen haku MongoDB tietokannasta
app.get("/api/myBooks", (req, res) => {
  // get all books
  Book.find({}).then(books => {
    console.log(books)
    res.json(books)
  }) 
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
// tulevia HTTP POST -pyyntöjä
// tallennus MongoDB tietokantaan (kirja ja/tai arvostelu)
app.post('/api/myBooks', (req, res) => {
  
  const body = req.body
  
  const book = new Book({
    book_id: body.book_id
  })
  
  // var d = new Date()
  // var e = new Date().toISOString();
  // var year = d.substr(0,4)
  // var month = d.substr(5,2)
  // var day = d.substr(8,2)
  // var hour = d.substr(11,2)
  // var min = d.substr(14,2)
  
  // arvostelu
  const review = { 
    writer: body.writer, 
    reviewtext: body.reviewtext, 
    stars: body.stars, 
    date: Date.now()
  }

  // Contributor: Juho Hyödynmaa
  // ...
  Book.find({ book_id: body.book_id })
    .then(result => {
      // jos kirja löytyy, sitä ei lisätä
      if (result.length) {
        console.log('book found')
        res.json(result)
      } else {
      // uusi kirja lisätään tietokantaan
        book
          .save()
          .then(savedBook => {
            res.json(savedBook)
            console.log('new book saved') 
          })
          .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'new book save failed' }) 
          })
        // ensimmäisen arvostelun tallennus jos kirjaa ei tietokannassa
        book.reviews.push(review)  
      }
  })
  
  // Contributor: Juho Hyödynmaa
  // arvostelu tallentuu tietokantaan ja järjestää arvostelut laskevaan järjestykseen päivämäärän perusteella
  Book.updateOne({book_id: body.book_id}, { $push: { reviews: {
      $each: [review],
      $sort: { date: -1 }
    }}}).then(() => {
    console.log('review saved')
  })

})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks/:id
// tulevia HTTP GET -pyyntöjä
app.get("/api/myBooks/:id", (req, res) => {

  const id = req.params.id
  
  // Contributor: Juho Hyödynmaa
  // etsitään kirjan id:llä kaikki kirjan arvostelut MongDB 
  Book.findOne({ book_id: id }).then(result => {
    if (result) {
      // arvostelut localhostiin 
      res.json(result.reviews)
    } else {
      res.json(null)	
    }
  })
  .catch(error => {
    console.log(error)
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
