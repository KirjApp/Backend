# Backend

Initial backend code of KirjApp application is uploaded 5.9.2020. Programming language: Node.js 

The following files are included: 
- .gitignore 
- README.md 
- index.js 
- package-lock.json 
- package.json 
  
The definitions in index.js file: 

- dotenv (for using of environment variables (API KEY, PORT,…)) 
- express (interface for programming web applications using Node.js) 
- cors (same origin policy, enables running JavaScript in browser of web application and server if they are not in the same origin) 
- googleapis (Node.js client library for using Google APIs. Support for authorization and authentication with OAuth 2.0, API Keys and JWT tokens is included) 

Functionality: 

- Defines event handler app.get("/api/books", (req, res) => {…} for getting the books data from Google Books API to be shown in the user interface (frontend). Query is a parameter from the search text field in the user interface 
- Prints to console: book id, book title, author(s), average rating, publisher and published date/year 
