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
// Kuvaus: apufunktiota testaukseen
//
// Materiaali on Creative Commons BY-NC-SA 4.0-lisenssin alaista.
// This material is under Creative Commons BY-NC-SA 4.0-licence.

// dummy-funktio, palauttaa aina arvon 1
const dummy = (books) => {
  return 1
}

// totalReviews-funktion, palauttaa arvostelujen yhteismäärän
const totalReviews = (books) => {
  const reducer = (sum, item) => {
    return sum + item.reviews.length
  }
  return books.length === 0
    ? 0
    : books.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalReviews,
}