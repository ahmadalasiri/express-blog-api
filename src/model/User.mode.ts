import { Document, Schema, model } from 'mongoose';

import { IUser } from '../interfaces/User.interface';

let userSchema: Schema<IUser & Document> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      minlength: 5,
      maxlength: 100,
      trim: true,
    },

    password: {
      type: String,
      required: true,
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
      enum: ['user', 'admin', 'moderator'],
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
