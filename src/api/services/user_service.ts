import mongoose from "mongoose";
import { User } from "../../domain/entities/user";
import { IUserService } from "../../domain/ports/iuser_service";

const UserSchema = new mongoose.Schema<User>(
    {
        name: String,
        email: String,
        password: String,
    },
    { timestamps: true }
);


const UserModel = mongoose.model<User>("User", UserSchema);

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

    async findByEmail(email: string): Promise<User | null> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const foundUser = await UserModel.findOne({ email: email });
        return foundUser;
    }

    async findByPassword(password: string): Promise<User | null> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const foundUser = await UserModel.findOne({ password: password })
        return foundUser;
    }

    async findUser(email: string, password: string): Promise<User | null> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const foundUser = await UserModel.findOne({ email: email, password: password })
        return foundUser;
    }

    async create(newUser: User): Promise<User | undefined> {
        const isConnected = await this.connect(process.env.DB_URL);
        if (!isConnected) throw new Error("Database was not connected.");
        const createdUser = await UserModel.create(newUser);
        return createdUser;
    }
}

