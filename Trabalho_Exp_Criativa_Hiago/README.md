# Portal de Serviços

Aluno: Hiago Bernardo da Silva

Este é o sistema de gerenciamento de serviços desenvolvido com React (Vite) no frontend e Node.js/Express no backend. O banco de dados utilizado foi o MySQL.

## Como rodar o projeto

**1. Banco de Dados:**
* Importe o arquivo `banco_de_dados.sql` (que está nesta pasta) no MySQL Workbench.
* Se necessário, abra o arquivo `backend/db.js` e altere a senha para a senha do seu usuário root local.

**2. Instalando as dependências:**
Abra o terminal na pasta raiz do projeto e rode o comando abaixo para instalar tudo (front e back):
npm install
Existe o script no package.json:
  "scripts": {
    "dev": "vite",
    "start": "node backend/index.js",

**3. Iniciando o Backend:**
No mesmo terminal, rode:
npm start

**4. Iniciando o Frontend:**
Abra um novo terminal (também na pasta raiz) e rode:
npm run dev

O site vai abrir no navegador (geralmente em http://localhost:5173).