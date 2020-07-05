const fs = require('fs')
const axios = require('axios');

module.exports = (path, options) => {

  const promise = new Promise((resolve, reject) => {
    // let files = [];
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
        return;
      }
      let array = [];
      const regexMdLinks = /\[([^\[]+)\](\(http.*\))/gm

      const matches = data.match(regexMdLinks)

      const singleMatch = /\[([^\[]+)\]\((.*)\)/
      for (var i = 0; i < matches.length; i++) {
        let text = singleMatch.exec(matches[i])
        array.push({ href: text[2], text: text[1], file: path })
      }

      if (options && options.validate === true) {
        let promises = []

        for (let i of array) {
          promises.push(validarLink(i))
        }

        Promise.all(promises).then((data) => {
          resolve(data)
        }).catch((error) => {
          console.error('error', error);
        });
      } else {
        resolve(array)
      }
    })
  });

  function validarLink(item) {
    return axios.get(item.href)
      .then(response => {
        item.valid = "ok";
        return item;
      })
      .catch(error => {
        item.valid = "fail";
        return item
      });
  }

  return promise;
};






// const fs = require('fs')
// let files = [];
// fs.readFile('./README.md', 'utf8', function (err, data) {
//   if (err) {
//     console.log(err)
//     return;
//   }

//   const regex = /https:/gm;
//   let m;

//   while ((m = regex.exec(data)) !== null) {
//     // This is necessary to avoid infinite loops with zero-width matches
//     if (m.index === regex.lastIndex) {
//       regex.lastIndex++;
//     }

//     // The result can be accessed through the `m`-variable.
//     m.forEach((match, groupIndex) => {
//       console.log(`Found match, group ${groupIndex}: ${match}`);
//     });
//   }



// })

