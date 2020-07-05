const mdLinks = require('./library')


// mdLinks('./README.md')
// .then(result => console.log(result))
// .catch(error => console.log("promise rejeitada: " + error));

// mdLinks('./README.md', { validate: true })
//   .then(result => console.log(result))
//   .catch(error => console.log("promise rejeitada: " + error));

mdLinks('./')
  .then(result => console.log(result))
  .catch(error => console.log("promise rejeitada: " + error));
