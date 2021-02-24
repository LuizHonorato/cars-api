# Introdução

Cars API - Aplicação cadastro e gerenciamento de carros.

# Pré-requisitos

- Docker.
- docker-compose.

# Sobre o build

Esta Aplicação foi criada com a utilização das seguintes ferramentas:

- Node
- Typescript
- TypeORM
- MongoDB

# Execução

 Para executar o backend da aplicação siga os seguintes passos:
 
 - Clone este repositório rodando o seguinte comando: git clone https://github.com/LuizHonorato/cars-api.git
 - Rode o comando docker-compose build para gerar a imagem da aplicação
 - Rode o comando docker-compose up para rodar a aplicação
 - Pronto! A aplicação estará disponível no endereço http://localhost:3333/cars
 
# Testes

 Para executar os testes da aplicação siga os seguintes passos:
 
 - Com a imagem rodando, rode o seguinte comando: docker-compose exec app bash
 - Após entrar no terminal do container, rode o seguinte comando: npm run test
 - Os testes serão executados e deve ser exibido o status de cada um

 
