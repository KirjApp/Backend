# Backend

The following files are included: 

- .gitignore 
- README.md 
- index.js 
- package-lock.json 
- package.json
- models/book.js
- models/user.js
  
Definitions in index.js: 

- dotenv (for using of environment variables (API KEY, PORT,…)) 
- express (interface for programming web applications using Node.js) 
- cors (same origin policy, enables running JavaScript in browser of web application and server if they are not in the same origin) 
- googleapis (Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0, API Keys and JWT tokens is included) 
- jsonwebtoken (for storage of user login)
- bcrypt (password-hashing function)

Functionality of index.js:

- Event handlers

  - app.get("/api/books", (req, res) => {…} get the books data from Google Books API to be shown in the user interface (frontend). Query is a parameter from the search text field in the user interface
  - app.get("/api/book/:id", (req, res) => {…} get the book data of one book (by Google Books API book id)
  - app.get("/api/myBooks", (req, res) => {…} get data for all books stored in MongoDB
  - app.get("/api/users", (req, res) => {…} get data for all users stored in MongoDB
  - app.post('/api/myBooks', (req, res) => {…} stores a written review in MongoDB for a book defined by book id, creates a new book and stores it in MongoDB if necessary
  - app.get("/api/myBooks/:id", (req, res) => {…} get all reviews found in MongoDB for a book defined by book id
  - app.get('/api/userReviews', async (req, res) => {…} get all reviews found in MongoDB for a user defined by jsonwebtoken
  - app.post('/api/users', async (request, response) => {…} creates a new username entry in MongoDB. checks for password length (3 or more characters) and username length (3 or more characters), and if username already exists
  - app.post('/api/login', async (request, response) => {…} if login input (username and password hash) matches a user found in MongoDB, stores a jsonwebtoken to be used for keeping track of logged use

Content of package-lock.json
- automatically generated file that keeps track of dependency versions

Content of package.json
- metadata of project version and list of dependencies

Content of models/book.js

- definitions: mongoose (MongoDB, external database)
- establish a connection to mongoose
- define format of data stored and pulled for each book document

Content of models/user.js

- definitions: mongoose (MongoDB, external database), mongoose-unique-validator (checking if username is unique)
- define format of data stored and pulled for each user document
