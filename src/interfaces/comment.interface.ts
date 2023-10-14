import { Types } from 'mongoose';

export interface IComment {
  content: string;
  post: Types.ObjectId;
  user: Types.ObjectId;
}
