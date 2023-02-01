import { User } from '../entities/user'
import { UserAuthentication } from '../entities/user_authentication'

export interface IUserService {
    create(newUser: User): Promise<User | undefined>;
    login(user: UserAuthentication): Promise<UserAuthentication | undefined>;
}