import { Company } from '../entities/Company';
import { User } from '../entities/user'
import { UserAuthentication } from '../entities/user_authentication'

export interface IUserService {
    
    create(newUser: User): Promise<User | undefined>;
    findByEmailAndPassword(email: string, password: string): Promise<User | undefined>;
    
}