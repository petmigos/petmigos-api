# Portas

São interfaces criadas que representam serviços externos (banco de dados, API externa). Um exemplo seria:

```ts
// Sempre colocar um I (i maiúsculo) na frente de interfaces
interface IUserRepository {
  login(username: string, password: string): UserAuthenticated;
  create(newUser: User): boolean;
  // ...
}
```

Isso diz que, para que o **core** da minha aplicação consiga utilizar algum serviço, ele precisa
**OBRIGATORIAMENTE implementar essa interface**.
