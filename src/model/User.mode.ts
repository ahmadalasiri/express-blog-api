import { Document, Schema, model } from 'mongoose';

import IUser from '../interfaces/User.interface';

let userSchema: Schema<IUser & Document> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name required'],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      minlenght: 2,
      maxlenght: 100,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      require: [true, 'Email is required'],
      minlenght: 5,
      maxlenght: 100,
      trim: true,
    },

    password: {
      type: String,
      require: true,
      min: 8,
      trim: true,
    },
    profilePicture: {
      type: Object,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
      publicId: null,
    },
    bio: {
      type: String,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let User = model<IUser & Document>('User', userSchema);

export default User;
