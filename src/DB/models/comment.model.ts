import { Document, Schema, model } from 'mongoose';

import { IComment } from '../../interfaces/comment.interface';

const CommentSchema: Schema<IComment & Document> = new Schema({
  content: { type: String, required: true },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const CommentModel = model<IComment & Document>('Comment', CommentSchema);
