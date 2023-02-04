import mongoose from "mongoose";
import { User } from "../../domain/entities/user";
import { IUserService } from "../../domain/ports/iuser_service";
import { UserAuthentication } from "../../domain/entities/user_authentication";

const UserSchema = new mongoose.Schema<User>(
    {
        nameUser: String,
        emailUser: String,
        passwordUser: String,
    },
    { timestamps: true }
);

const UserAuthenticationSchema = new mongoose.Schema<UserAuthentication>(
    {
        nameUser: String,
        passwordUser: String,
    },
    { timestamps: true }
);

const UserModel = mongoose.model<User>("User", UserSchema);
const UserAuthenticationModel = mongoose.model<UserAuthentication>("UserAuthentication", UserAuthenticationSchema);

export class UserService implements IUserService {

    
    private async connect(dbURL?: string): Promise<boolean> {
        if (!dbURL) return false;
        try {
            mongoose.set("strictQuery", false);
            await mongoose.connect(dbURL);
            return true;
        } catch (exception) {
            return false;
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const foundUser = await UserModel.findOne({emailUser: email});
        if(foundUser == null) return undefined;
        return foundUser;
    }
    
    async create(newUser: User): Promise<User | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const createdUser = await UserModel.create(newUser);
        return createdUser;
    }

    async login(user: UserAuthentication): Promise<UserAuthentication | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const createdUser = await UserAuthenticationModel.create(user);
        return createdUser;
    }
}
