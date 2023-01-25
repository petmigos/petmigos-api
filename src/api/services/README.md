# Serviços

Classes de serviço que **implementam** uma [porta](../../domain/ports/README.md). É aqui que será implementadas as classes que lidam com banco de dados, API externas, entre outros serviços. Ex:

```ts
class MySQLUserRepository implements IUserRepository {
  login(/*...*/) {
    // ...
  }

  create(/*...*/) {
    // ...
  }
}
```
