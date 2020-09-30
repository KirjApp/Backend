//dotenv: ympäristömuuttujien määrittelyyn (esim. API KEY, PORT,...), asennus: npm install dotenv --save
require("dotenv").config();
//express: ohjelmointirajapinta web-sovellusten ohjelmointiin Node:js:llä, asennus: npm install express --save
const express = require("express");
const cors = require("cors");
const app = express();
//Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0, ä
//API Keys and JWT tokens is included, asennus: npm install googleapis
const { google } = require("googleapis");

app.use(cors());

const books_api_key = process.env.BOOKS_API_KEY;
//console.log("api key?", books_api_key);

//Kirja
const Book = require('./models/book')

app.use(express.json())

const books = google.books({
  version: "v1",
  //auth: `${books_api_key}`
});
/*
const params = {
  //hakusana
  q: 'php',
  //ladattavien kirjojen formaatti
  //download = 'epub',
  //tulosten suodatus (partial, full, free-ebooks, paid-ebooks, ebooks)
  //filtering: 'full',
  //tulosten maksimimäärä
  maxResults: 20,
  //printType (all, books, magazines)
  //printType: 'all',
  //kirjan tiedoista näytettävät kentät: 'full' = kaikki, 'lite' = rajoitettu osa
  projection: 'full',
  //lajittelu (relevance, newest)
  //sorting: 'relevance'
};
*/
//määritellään routet

//määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen juureen eli
//polkuun / tulevia HTTP GET -pyyntöjä
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

//määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/books
//tulevia HTTP GET -pyyntöjä
app.get("/api/books", (req, res) => {
  //console.log(req.query.q);
  //console.log(req.query.maxResults);
  //console.log(req.query.projection);
  //const query = req.params.q
  //console.log(params)
  //määrittely toimii
  let query = req.query.q;
  //let maxResults = req.query.maxResults;
  let projection = req.query.projection;
  const params = {
    //hakusana
    q: query,
    //ladattavien kirjojen formaatti
    //download = 'epub',
    //tulosten suodatus (partial, full, free-ebooks, paid-ebooks, ebooks)
    //filtering: 'full',
    //tulosten maksimimäärä
    //maxResults: maxResults,
    //printType (all, books, magazines)
    //printType: 'all',
    //kirjan tiedoista näytettävät kentät: 'full' = kaikki, 'lite' = rajoitettu osa
    projection: projection,
    //lajittelu (relevance, newest)
    //sorting: 'relevance'
  };
  //haetaan hakuehdon täyttävät kirjat
  books.volumes
    .list(params)
    //tulostetaan konsoliin kirjan tiedot
    .then((books) => {
		
    //  for (i = 0; i < params.maxResults; i++) {
    //    console.log("Kirjan id: " + books.data.items[i].id);
    //    console.log("Kirjan nimi: " + books.data.items[i].volumeInfo.title);
    //    console.log(
    //      "Kirjan kirjoittaja(t): " + books.data.items[i].volumeInfo.authors
    //    );
    //    console.log(
    //      "Kirjan keskiarvoarvostelu: " +
    //        books.data.items[i].volumeInfo.averageRating
    //    );
    //    console.log(
    //      "Kirjan kustantaja: " + books.data.items[i].volumeInfo.publisher
    //    );
    //    console.log(
    //      "Kirjan julkaisupäivä. " +
    //        books.data.items[i].volumeInfo.publishedDate
    //    );
    //    console.log();
    //  }
	  
      //tuloslistaus localhostiin
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
    });
});

//määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
//tulevia HTTP GET -pyyntöjä
//data from MongoDB Atlas database
app.get("/api/myBooks", (req, res) => {
  // get all books
  Book.find({}).then(books => {
    console.log(books)
    res.json(books)
  }) 
})

//määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
//tulevia HTTP POST -pyyntöjä
//add new data to books to MongoDB Atlas database (book and/or review)
app.post('/api/myBooks', (req, res) => {
  
  const body = req.body
  
  const book = new Book({
    book_id: body.book_id
  })
  
  var d = new Date().toISOString();
  var year = d.substr(0,4)
  var month = d.substr(5,2)
  var day = d.substr(8,2)
  
  const review = { 
    writer: body.writer, 
    reviewtext: body.reviewtext, 
    stars: body.stars, 
    date: day + ' / ' + month + ' / ' + year
  }

  //Contributor: Juho Hyödynmaa
  //...
  Book.find({ book_id: body.book_id })
    .then(result => {
      // jos kirja löytyy, sitä ei lisätä
      if (result.length) {
        console.log('book found')
        res.json(result)
      } else {
      // uusi kirja lisätään tietokantaan
        book
          .save((savedBook) => { 
          //.then(savedBook => savedBook.toJSON())
          //.then(savedAndFormattedBook => {
            res.json(savedBook)
            console.log('new book saved') 
          })
          .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'bad id' }) 
          })
        book.reviews.push(review)  
      }
  })
  
  //Contributor: Juho Hyödynmaa
  //Arvostelu tallentuu tietokantaan
  Book.updateOne({book_id: body.book_id}, { $push: { reviews: [ review ] }}).then(() => {
    console.log('review saved')
  })

})

//määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks/:id
//tulevia HTTP GET -pyyntöjä
app.get("/api/myBooks/:id", (req, res) => {

  const id = req.params.id
  
  // etsitään kirjan id:llä kaikki kirjan arvostelut
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

//otetaan käyttöön kehitysaikainen työkalu nodemon, joka asennetaan komennolla: npm install --save-dev nodemon
//koodin muutokset aiheuttavat nyt automaattisen palvelimen uudelleenkäynnistymisen
//selain pitää kuitenkin refreshata
//sovelluksen käynnistys nodemonin käyttöönoton jälkeen: npm run dev (,jos on luotu skripti package.json-tiedostoon)

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
