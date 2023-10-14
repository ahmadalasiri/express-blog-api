import { Document, Schema, model } from 'mongoose';

import { IPost } from '../../interfaces/post.interface';

let PostSchema: Schema<IPost & Document> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    claps: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [
      {
        commnetId: { type: Schema.Types.ObjectId, ref: 'Comment' },
      },
    ],
  },
  { timestamps: true }
);

let PostModel = model<IPost & Document>('Post', PostSchema);

export default PostModel;
