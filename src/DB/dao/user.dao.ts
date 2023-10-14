import { IUser } from '../../interfaces/User.interface';
import UserModel from '../models/user.model';

class UserDao {
  async getUserByUsername(emailOrUsername: string): Promise<IUser | null> {
    return await UserModel.findOne({ username: emailOrUsername }).lean();
  }

  async getUserByEmail(emailOrUsername: string): Promise<IUser | null> {
    return await UserModel.findOne({ email: emailOrUsername }).lean();
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await UserModel.findById(userId).lean();
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find({}).lean();
  }

  async create(user: IUser): Promise<IUser> {
    return await UserModel.create(user);
  }

  async update(userId: string, user: IUser): Promise<IUser | null> {
    console.log(user);
    return await UserModel.findByIdAndUpdate(userId, user, { new: true }).lean();
  }

  async delete(userId: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(userId).lean();
  }
}

export default UserDao;
