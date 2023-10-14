import { Types } from 'mongoose';

export interface IUser {
  _id?: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePicture: {
    url: string;
    publicId: string | null;
  };
  bio: string;
  role: string;
  active: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
}
