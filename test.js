const mdLinks = require('./index')
// mdLinks('./README.md')
//   .then(result => console.log(result))
//   .catch(error => console.log("promise rejeitada: " + error));

mdLinks('./test/README.md', { stats: true })
  .then(result => console.log(result))
  .catch(error => console.log("promise rejeitada: " + error));

// mdLinks('./')
//   .then(result => console.log(result))
//   .catch(error => console.log("promise rejeitada: " + error));
