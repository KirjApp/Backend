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
// Kuvaus: sovelluksen käynnistäminen määriteltyyn porttiin Noden http-olion avulla.
// (Express-sovellus on eristetty tiedostoon app.js)
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

const app = require('./app') // varsinainen Express-sovellus
const http = require('http')

const server = http.createServer(app)

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
