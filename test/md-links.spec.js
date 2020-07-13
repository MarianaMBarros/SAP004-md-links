const mdLinks = require('../index')

describe('mdLinks', () => {
  it('Deve retornar somente os links quando não informada as opções', () => {
    return mdLinks('./test/README.md')
      .then((data) => {
        expect(data).toEqual([
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/', text: 'criação de uma Promise' },
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react-and-typescript/', text: 'fórum da comunidade' },
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react-and-typescript/', text: 'fórum da comunidade' },
          { file: './test/README.md', href: 'http://www.oooo.lo.lo', text: 'erro' },
        ])
      })
  }); it('Comando --stats', () => {
    return mdLinks('./test/README.md', { stats: true })
      .then((data) => {
        expect(data).toEqual({
          Total: 4, Unique: 3,
        })
      })
  });
  it('Comando --validate', () => {
    return mdLinks('./test/README.md', { validate: true })
      .then((data) => {
        expect(data).toEqual([
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-write-a-javascript-promise-4ed8d44292b8/', statusCode: 200, text: 'criação de uma Promise', valid: 'ok' },
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react-and-typescript/', statusCode: 200, text: 'fórum da comunidade', valid: 'ok' },
          { file: './test/README.md', href: 'https://www.freecodecamp.org/news/how-to-build-a-quiz-app-using-react-and-typescript/', statusCode: 200, text: 'fórum da comunidade', valid: 'ok' },
          { file: './test/README.md', href: 'http://www.oooo.lo.lo', statusCode: '404', text: 'erro', valid: 'fail' },

        ]);
      })
  });
  it('Comando --stats --validate', () => {
    return mdLinks('./test/README.md', { validate: true, stats: true })
      .then((data) => {
        expect(data).toEqual({
          Total: 4, Unique: 3, Broken: 1
        })
      })
  });

});

