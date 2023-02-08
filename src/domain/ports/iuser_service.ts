import { User } from '../entities/user'

export interface IUserService {
    create(newUser: User): Promise<User | undefined>;
    findByEmailAndPassword(email: string, password: string): Promise<User | undefined>;
}