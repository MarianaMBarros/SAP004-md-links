const mdLinks = require('../index')


describe('mdLinks', () => {

  it('Deve retornar somente os links quando não informada as opções', () => {
    return mdLinks('./test/README.md').then((data) => {
      expect(data).toEqual([{
        file: './test/README.md',
        href: 'https://developer.mozilla.org/pt-BR/docs/Glossario/Callback_function',
        text: 'Uso de callbacks'
      }])
    })
  });

});

