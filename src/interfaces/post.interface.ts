import { Types } from 'mongoose';

import { IComment } from './comment.interface';

export interface IPost {
  title: string;
  content: string;
  author: Types.ObjectId;
  claps: Types.ObjectId[];
  comments: IComment[];
}
