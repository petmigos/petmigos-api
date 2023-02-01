import { User } from '../entities/user'

interface IUserRepository {
    login(username: string, password: string): UserAuthenticated;
    create(newUser: User): boolean;
    
}