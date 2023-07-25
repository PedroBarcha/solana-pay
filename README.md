# Projeto 7: Loja de brisas

## Site

## Rede utilizada

Solana devnet

## Como Usar

Para começar com este projeto, clone este repositório e siga estes comandos:

1. Execute `npm install` na raiz do seu diretório
2. Execute `npm run dev` para iniciar o projeto

## Modificações

- Temática: Curadoria de brisas. Cada pacote tem uma proposta completamente diferente, com uma vibe maneira garantida 😎.
- Correção de upload no IPFS. Infura agora requer uma chave secreta de API e para criá-la é necessário cadastrar um cartão de crédito. Assim, o código original não permite mais upload de arquivos direto no IPFS. O campo de upload foi susbtituído para receber diretamente o hash do arquivo já subido no IPFS.
- Imagens de preview (thumbnails) agora moram no IPFS! Vamos descentralizar tudo que pudermos!!!
- Visual do forms de inserção de produtos reorganizado.
- Web3 é sobre transparência! Seguindo esse espírito, foi adicionado um campo indicando quantos arquivos estão contidos no pacote. O administrador insere esse valor no formulário de criação de produtos e o usuário consegue ver essa quantidade na loja!
