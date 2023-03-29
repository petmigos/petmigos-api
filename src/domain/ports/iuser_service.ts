import { User } from '../entities/user'

export interface IUserService {
    create(newUser: User): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | null>;
    findByPassword(password: string): Promise<User | null>;
    findUser(email: string, password: string): Promise<User | null>
    findUserById(id: string): Promise<User | null>
}