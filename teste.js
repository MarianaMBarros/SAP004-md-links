const mdLinks = require('./index');

mdLinks('./test/', { validate: true })
  .then(result => {
    console.log(result);
  })
  .catch(error => console.log("promise rejeitada: " + error));
