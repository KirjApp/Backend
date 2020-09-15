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
console.log("api key?", books_api_key);

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
  console.log(req.query.q);
  console.log(req.query.maxResults);
  console.log(req.query.projection);
  //const query = req.params.q
  //console.log(params)
  //määrittely toimii
  let query = req.query.q;
  let maxResults = req.query.maxResults;
  let projection = req.query.projection;
  const params = {
    //hakusana
    q: query,
    //ladattavien kirjojen formaatti
    //download = 'epub',
    //tulosten suodatus (partial, full, free-ebooks, paid-ebooks, ebooks)
    //filtering: 'full',
    //tulosten maksimimäärä
    maxResults: maxResults,
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
      for (i = 0; i < params.maxResults; i++) {
        console.log("Kirjan id: " + books.data.items[i].id);
        console.log("Kirjan nimi: " + books.data.items[i].volumeInfo.title);
        console.log(
          "Kirjan kirjoittaja(t): " + books.data.items[i].volumeInfo.authors
        );
        console.log(
          "Kirjan keskiarvoarvostelu: " +
            books.data.items[i].volumeInfo.averageRating
        );
        console.log(
          "Kirjan kustantaja: " + books.data.items[i].volumeInfo.publisher
        );
        console.log(
          "Kirjan julkaisupäivä. " +
            books.data.items[i].volumeInfo.publishedDate
        );
        console.log();
      }
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

//otetaan käyttöön kehitysaikainen työkalu nodemon, joka asennetaan komennolla: npm install --save-dev nodemon
//koodin muutokset aiheuttavat nyt automaattisen palvelimen uudelleenkäynnistymisen
//selain pitää kuitenkin refreshata
//sovelluksen käynnistys nodemonin käyttöönoton jälkeen: npm run dev (,jos on luotu skripti package.json-tiedostoon)

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
