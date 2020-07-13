# Markdown Links

## Índice

- [Markdown Links](#markdown-links)
  - [Índice](#índice)
  - [1. Prefácio](#1-prefácio)
  - [2. Considerações gerais](#2-considerações-gerais)
  - [3. Instalação](#3-instalação)
  - [4. Utilização e Retorno](#4-utilização-e-retorno)
  - [5. Agradecimentos](#5-agradecimentos)

***

## 1. Prefácio

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

Os arquivos `Markdown` normalmente contém _links_ que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali.

Projeto desenvolvido durante o bootcamp da Laboratória.

## 2. Considerações gerais
 A biblioteca e script executável (ferramenta de linha de comando - CLI) devem ser implementados em JavaScript para serem executadas com Node.JS.

## 3. Instalação
A utilização da biblioteca poderá ser realizada através da instalação Node.js em seu computador e pelo comando em seu terminal:

`npm -i -g MarianaMBarros/SAP004-md-links`
Para instalação local.
`npm -i  MarianaMBarros/SAP004-md-links`


## 4. Utilização e Retorno
Após a instalação da biblioteca, poderá utilizar através de linhas de comando em seu terminal:

`md-links <path-to-file>`
```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link de algo
```


Se passamos a opção `--validate ou -v`, o módulo deve trazer se o link encontrado é valido.

`md-links <path-to-file> --validate ou -v`
```sh
$ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
```

Se passamos a opção `--stats ou -s` o output (saída) será um texto com estatísticas.

`md-links <path-to-file> --stats ou -s`
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Também podemos combinar `--stats` e `--validate` para obter estatísticas que necessitem dos resultados da validação.

`md-links <path-to-file> --stats --validate ou -s -v`
```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

## 5. Agradecimentos
* Laboratória
