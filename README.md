# Next Parking Over Here

Projeto criado com create next app, adicionado docker e .devcontainer par acelerar o desenvolvimento.

## Desenvolvimento

Para o desenvolvimento basta realizar o seguinte passos:

1. Gerar copia do `.env.example` para `.env` e ajustar os valores

```properties
PORT=3000
FORWARD_PORT=3000
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXTAUTH_SECRET=G814iovWksZKIsa3+oW8vgiaBAw6UFqUnsq7Op3zwlg=
NEXTAUTH_URL=http://localhost
```

2. Caso tenha o ambiente docker configurado na máquina necessário apenas rodar o comando

```sh
docker compose up -d
```

3. Acessar a a url `localhost:3000` para ver a tela de login
