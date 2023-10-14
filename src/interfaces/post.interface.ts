import { ObjectId } from 'mongoose';

import { IComment } from './comment.interface';

export interface IPost {
  title: string;
  content: string;
  author: ObjectId;
  claps: ObjectId[];
  comments: IComment[];
}
