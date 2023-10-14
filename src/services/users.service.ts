import bcrypt from 'bcrypt';
import fs from 'fs';
import { autoInjectable } from 'tsyringe';

import UserDao from '../DB/dao/user.dao';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/User.interface';
import { cloudinaryDeleteImage, cloudinaryUploadImage } from '../utils/cloudinary';

@autoInjectable()
class UserService {
  constructor(private userDao: UserDao) {}

  /**********************************
   *
   *    Admin
   *
   **********************************/
  async getUsers() {
    return await this.userDao.getUsers();
  }

  async getUser(userId: string) {
    return await this.userDao.getUserById(userId);
  }

  async createUser(user: IUser) {
    // check if the user already exists
    let isEmailExists = await this.userDao.getUserByEmail(user.email);
    let isUsernameExists = await this.userDao.getUserByUsername(user.username);

    if (isEmailExists) {
      throw new HttpException(409, `E-Mail address ${user.email} is already exists, please pick a different one.`);
    } else if (isUsernameExists) {
      throw new HttpException(409, 'Username already in use');
    }

    // hash the password
    user.password = await bcrypt.hash(user.password, 10);

    let newUser = await this.userDao.create(user);

    return newUser;
  }

  async updateUser(userId: string, user: IUser) {
    let isUserExists = await this.userDao.getUserById(userId);
    if (!isUserExists) throw new HttpException(404, 'No user found');
    return await this.userDao.update(userId, user);
  }

  async deleteUser(userId: string) {
    let isUserExists = await this.userDao.getUserById(userId);
    if (!isUserExists) throw new HttpException(404, 'No user found');
    // TODO: delete all the posts and comments that belong to this user
    return await this.userDao.delete(userId);
  }

  async updateProfileImage(userId: string, file: Express.Multer.File) {
    const filePath = `${file.path}`;
    const result = await cloudinaryUploadImage(filePath);
    // update the user with the image url and public id
    let user = await this.userDao.getUserById(userId);
    if (!user) throw new HttpException(404, 'No user found');
    // delete the old image from cloudinary if exists
    if (user.profilePicture.publicId) await cloudinaryDeleteImage(user.profilePicture.publicId);
    // Change the profilePhoto field in the DB
    user = await this.userDao.update(userId, { profilePicture: { url: result.secure_url, publicId: result.public_id } } as IUser);

    // remove the file from the server
    fs.unlinkSync(filePath);
    return user;
  }
}
export { UserService };
