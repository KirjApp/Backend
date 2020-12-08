# Backend

### Test specific branch

#### Book list test(s):
- run test(s) with the command: __npm test -- tests/book_list.test.js__
- no need to start frontend and/or backend

#### Book API test(s):
- run test(s) with the command: __npm test -- tests/book_api.test.js__
- no need to start frontend and/or backend

#### All test(s):
- including book list and book API tests
- run test(s) with the command: __npm test__
- no need to start frontend and/or backend


Backend project contributors:  
Henri Lahtela  
Esa Mäkipää  
Juho Hyödynmaa

Backend file descriptions as of 13.11. JavaScript used as programming language. Node.js used as runtime environment.  

The material is under the Creative Commons BY-NC-SA 4.0-licence.  https://creativecommons.org/licenses/by-nc-sa/4.0/

The following files are included: 

- .gitignore 
- README.md
- app.js
- controllers/testing.js 
- index.js 
- package-lock.json 
- package.json
- models/book.js
- models/user.js
- tests/book_api.test.js
- tests/book_list.test.js
- utils/list_helper.js
  
Definitions in app.js: 

- dotenv (for using of environment variables (API KEY, PORT,…)) 
- express (interface for programming web applications using Node.js) 
- cors (same origin policy, enables running JavaScript in browser of web application and server if they are not in the same origin) 
- googleapis (Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0, API Keys and JWT tokens is included) 
- jsonwebtoken (for storage of user login)
- bcrypt (password-hashing function)

Functionality of app.js:

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

Content of index.js
- launches the application at the specified port with Node's built-in http object 

Content of controllers/testing.js
- defines the router for initializing the database in testeing mode 

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

Content of tests/book_api.test.js

- tests through REST API (database is included)

Content of tests/book_list.test.js

- tests for books and reviews

Content of utils/list_helper.js

- helper functions for testing books and reviews