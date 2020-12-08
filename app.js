// Contributor(s): Juho Hyödynmaa, Esa Mäkipää, Taika Tulonen
// 
// Juho Hyödynmaa: toiminnallisuudet kirjadatan ja käyttäjien käsittelyyn, 
// kirjadatan, käyttäjien ja arvostelujen tallennus MongoDB-tietokantaan ja tietojen haku tietokannasta
// parametrien perusteella
//
// Esa Mäkipää: routejen perusrunko, kirjadatan haku Google Books APIsta.
// Olen hyödyntänyt Full stack open 2020 -kurssilla
// (Helsingin yliopisto) oppimiani asioita
// Lähde:
// Full stack open 2020 (https://fullstackopen.com/),
// Syväsukellus moderniin websovelluskehitykseen (osat 0-8),
// kurssimateriaali on lisensoitu Creative Commons BY-NC-SA 3.0 -lisenssillä
// https://creativecommons.org/licenses/by-nc-sa/3.0/ 
// 
// Taika Tulonen: idea Google Books APIn käytöstä ja alustava
// selvitys toiminnallisuudesta
//
// Kuvaus: määrittelee routet kirjadatan hakuun sekä kirjaan ja käyttäjiin
// liittyvien arvostelujen hakuun ja tallentamiseen.
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

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

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(cors());

// testirouter testetjä varten, otetaan käyttöön vain testimoodissa (, kun NODE_ENV on 'test')
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

const books_api_key = process.env.BOOKS_API_KEY;

// kirja
const Book = require('./models/book')
// käyttäjä
const User = require('./models/user')

// staattisen sisällön näyttämiseen ja JavaScriptin lataamiseen,
// tarkastaa löytyykö build-hakemistoa
app.use(express.static('build'))
app.use(express.json())

const books = google.books({
  version: "v1",
  auth: `${books_api_key}`
});

// määritellään routet

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/books
// tulevia HTTP GET -pyyntöjä (kirjadatan haku Google Books APIsta hakusanalla)
app.get("/api/books", (req, res) => {
  let query = req.query.q;
  let maxResults = req.query.maxResults;
  let projection = req.query.projection;
  const params = {
    // hakusana
    q: query,
    // tulosten maksimimäärä
    maxResults: maxResults,
    // kirjan tiedoista näytettävät kentät: 'full' = kaikki, 'lite' = rajoitettu osa
    projection: projection,
    // lajittelu (relevance, newest)
    sorting: 'relevance'
  };
  // haetaan hakuehdon täyttävät kirjat
  books.volumes
    .list(params)
    .then((books) => {	  
      // tuloslistaus tallentuu localhostiin
      res.json(books);
    })
    .catch((error) => {
      console.error(error);
    });
});

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/book
// tulevia HTTP GET -pyyntöjä (yhden kirjan haku Google Books APIsta)
app.get("/api/book/:id", (req, res) => {
  const bookId = req.params.id;
  const projection = req.query.projection;
  const params = {
    // hakusana
    volumeId: bookId,
    // kirjan tiedoista näytettävät kentät: 'full' = kaikki, 'lite' = rajoitettu osa
    projection: projection,
  };
  // haetaan hakuehdon täyttävä kirja
  books.volumes
    .get(params)
    .then((book) => {	  
      // tuloslistaus localhostiin
      res.json(book);
    })
    .catch((error) => {
      console.error(error);
    });
});

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
// tulevia HTTP GET -pyyntöjä
// kaikkien kirjojen haku MongoDB tietokannasta
/*
app.get("/api/myBooks", (req, res) => {
  // haetaan kaikki kirjat
  Book.find({}).then(books => {
    res.json(books)
  }) 
})
*/
// async/await käytössä
app.get("/api/myBooks", async (req, res) => {
  // haetaan kaikki kirjat
  const books = await Book.find({})
  res.json(books) 
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/users
// tulevia HTTP GET -pyyntöjä
// kaikkien käyttäjien haku MongoDB tietokannasta
app.get("/api/users", (req, res) => {
  // haetaan kaikki käyttäjät
  User.find({}).then(users => {
    res.json(users)
  }) 
})

// poimii pyynnön mukana tulleesta autentikoinnin headerista tokenin
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return 'null'
}

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks
// tulevia HTTP POST -pyyntöjä
// arvostelun ja tarvittaessa kirjan tallennus MongoDB tietokantaan
app.post('/api/myBooks', (req, res) => {
  
  const body = req.body
  var decodedToken = null

  const token = getTokenFrom(req)

  if (token !== 'null') {
    // varmistetaan tokenin oikeellisuus, tokenin dekoodaus, eli palautetaan olio, jonka 
    // perusteella token on laadittu
    decodedToken = jwt.verify(token, process.env.SECRET)  
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token puuttuu tai ei ole oikea' })
    }   
  }
  
  const book = new Book({
    book_id: body.book_id
  })
  
  // arvostelu -olio
  const review = { 
    writer: body.writer, 
    book_id: body.book_id,
    book_title: body.book_title,
    reviewtext: body.reviewtext, 
    stars: body.stars, 
    date: Date.now()
  }

  // Tarkistus löytyykö kirja jo MongoDB-tietokannasta.
  Book.find({ book_id: body.book_id })
  .then(result => {
    // jos kirja löytyy, sitä ei lisätä
    if (result.length) {
      console.log('book found in database')
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
  
  // arvostelu tallentuu tietokantaan ja järjestää arvostelut laskevaan järjestykseen päivämäärän perusteella
  Book.updateOne({book_id: body.book_id}, { $push: { reviews: {
      $each: [review],
      $sort: { date: -1 }
    }}}).then(() => {
    console.log('review saved')
  })

  // arvostelu tallentuu tietokantaan käyttäjälle ja järjestää arvostelut laskevaan järjestykseen päivämäärän perusteella
  if (token !== 'null' && decodedToken !== null) {
	  User.updateOne({ _id: decodedToken.id }, { $push: { reviews: {
      $each: [review],
      $position: 0
    }}}).then(() => {
      console.log('review saved for user')
    })    
  }
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/myBooks/:id
// tulevia HTTP GET -pyyntöjä
app.get("/api/myBooks/:id", (req, res) => {

  const id = req.params.id
  
  // etsii ja palauttaa kirjan id:n perusteella kaikki kirjan arvostelut tietokannasta (MongoDB) 
  Book.findOne({ book_id: id }).then(result => {
    if (result) {
      // arvostelut talletetaan localhostiin
      res.json(result.reviews)
    } else {
      res.json(null)	
    }
  })
  .catch(error => {
    console.log(error)
  })
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/userReviews
// tulevia HTTP GET -pyyntöjä
app.get('/api/userReviews', async (req, res) => {

  // varmistetaan tokenin oikeellisuus, dekoodataan token, eli palautetaan olio, jonka 
  // perusteella token on laadittu
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token puuttuu tai ei ole oikea' })
  }
  
  // etsitään tokenin perusteella oikea käyttäjä tietokannasta (MongoDB)
  const user = await User.findOne({ _id: decodedToken.id })
    .catch(error => {
      console.log(error)
    })
  
  // palautetaan käyttäjän kirjoittamat arvostelut
  if (user) {
    // arvostelut localhostiin 
    res.json(user.reviews)
  } else {
    res.json(null)	
  }
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/users
// tulevia HTTP GET -pyyntöjä
// käyttäjän profiilin luonti
app.post('/api/users', async (request, response) => {
  const body = request.body
  
  // tarkistetaan salasanan pituus (vaatimus: 3 merkkiä tai enemmän)
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'salasanan ja/tai nimimerkin tulee olla vähintään 3 merkkiä' }).end()
  }

  // salasanan hash
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  // luodaan uusi käyttäjä (nimimerkki ja salasanan hash)
  const user = new User({
    username: body.username,
    passwordHash,
  })

  // nimimerkin validointi (vaatimus: 3 merkkiä tai enemmän)
  user.validate(async (error) => {
    if (error){
      return response.status(400).json({ error: 'nimimerkin ja/tai salasanan tulee olla vähintään 3 merkkiä' }).end()
    }
    else {
      // nimimerkki on kelvollinen, käyttäjän tiedot voidaan tallentaa tietokantaan (MongoDB)

      const userCheck = await User.find({ username: body.username })
        // jos käyttäjänimi löytyy, sitä ei lisätä
        if (userCheck[0]) {
          console.log('username already in use')
          return response.status(400).json({ error: `valitsemasi nimimerkki ${userCheck[0].username} on jo käytössä` }).end()
        } else {
        // uusi käyttäjä lisätään tietokantaan
          const savedUser = await user.save()
          response.status(201).json(savedUser)
      }
    }
  })
})

// määrittelee tapahtumankäsittelijän, joka hoitaa sovelluksen polkuun /api/users
// tulevia HTTP GET -pyyntöjä
// käyttäjän kirjautuminen
app.post('/api/login', async (request, response) => {
  const body = request.body

  // haetaan annettua nimimerkkiä vastaavaa käyttäjää tietokannasta (MongoDB)
  const user = await User.findOne({ username: body.username })

  // vertaa annettua salasanaa tallennettuun
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  // käyttäjää ei ole tai salasana ei ole oikea
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'tarkista nimimerkki ja/tai salasana'
    })
  }

  // käyttäjä on olemassa ja salasana on oikea, käyttäjä tokenin luomista varten
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // token luodaan
  const token = jwt.sign(userForToken, process.env.SECRET)

  // palauttaa tokenin ja käyttäjänimen
  response
    .status(200)
    .send({ token, username: user.username })
})

module.exports = app

/*
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
*/