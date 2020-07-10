const fs = require('fs')
const axios = require('axios');
const paths = require('path');

module.exports = (path, options) => {

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf8', (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        let array = [];
        const regexMdLinks = /\[([^\[]+)\](\(http.*\))/gm

        const matches = data.match(regexMdLinks)

        const singleMatch = /\[([^\[]+)\]\((.*)\)/
        for (let item of matches) {
          let text = singleMatch.exec(item)
          array.push({ href: text[2], text: text[1], file: path })
        }

        if (options && options.stats === true && options.validate === true) {
          let promises = []

          for (let item of array) {
            promises.push(validLink(item))
          }

          Promise.all(promises).then((data) => {
            const urls = data.map((curr) => {
              return curr.href;
            });
            const broken = data.filter(item => {
              return item.valid === "fail";
            })
            resolve({
              Total: data.length,
              Unique: [...new Set(urls)].length,
              Broken: broken.length
            })
          }).catch((error) => {
            console.error('error', error);
          });


        } else if (options && options.validate === true) {
          let promises = []

          for (let item of array) {
            promises.push(validLink(item))
          }

          Promise.all(promises).then((data) => {
            resolve(data)
          }).catch((error) => {
            console.error('error', error);
          });
        } else if (options && options.stats === true) {
          const urls = array.map((curr) => {
            return curr.href;
          });
          resolve({
            Total: array.length,
            Unique: [...new Set(urls)].length
          })
        } else {
          resolve(array)
        }
      })
    });
  }

  const validLink = (item) => {
    return axios.get(item.href, { validateStatus: () => true })
      .then((response) => {
        item.valid = response.statusText === "OK" ? "ok" : "fail";
        item.statusCode = response.status;
        return item;
      })
      .catch(() => {
        item.valid = "fail";
        item.statusCode = "404"
        return item
      });
  }

  const readFolder = (folder) => {
    return new Promise((resolve, reject) => {
      fs.readdir(folder, (error, list) => {
        if (error) {
          reject(error);
          return;
        }
        const files = list.filter(item => paths.extname(item) === ".md");
        let promises = []

        for (let item of files) {
          promises.push(readFile(item));
        }
        Promise.all(promises).then((data) => {
          resolve(data);
        }).catch((error) => {
          reject(error);
        })
      });

    });
  }

  const stats = fs.statSync(path)
  if (stats.isDirectory()) {
    return readFolder(path);
  } else {
    return readFile(path);
  }
};
