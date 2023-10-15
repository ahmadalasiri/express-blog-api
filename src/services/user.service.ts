import bcrypt from 'bcrypt';
import fs from 'fs';
import { autoInjectable } from 'tsyringe';

import UserDao from '../DB/dao/user.dao';
import HttpException from '../exceptions/HttpException';
import { IUser } from '../interfaces/user.interface';
import { cloudinaryDeleteImage, cloudinaryUploadImage } from '../utils/cloudinary';

@autoInjectable()
class UserService {
  constructor(private userDao: UserDao) {}

  async getUsers(reqQuery: any) {
    // 1- Filteration
    let query = { ...reqQuery };
    let excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete query[field]);

    // 2- Advanced Filteration (gt, gte, lt, lte, in) (mongodb operators)
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = JSON.parse(queryStr);

    // 2- Pagination
    let page = parseInt(reqQuery.page as string) || 1;
    let limit = parseInt(reqQuery.limit as string) || 10;
    let skip = (page - 1) * limit;

    // 3- Sorting
    let sort = reqQuery.sort || '-createdAt'; // default sort by createdAt desc

    return await this.userDao.listUsers(query, skip, limit, sort);
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
