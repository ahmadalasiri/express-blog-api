import { IPost, IPostUpdate } from '../../interfaces/post.interface';
import PostModel from '../models/post.model';

class PostDao {
  async getPost(id: string): Promise<IPost | null> {
    return await PostModel.findById(id).lean();
  }
  async listPosts(query: any, skip: number = 0, limit: number = 100, sort: any = {}, select: any = '-__v'): Promise<IPost[] | null> {
    return await PostModel.find(query).skip(skip).limit(limit).sort(sort).select(select).lean();
  }

  async createPost(post: IPost): Promise<IPost | null> {
    return await PostModel.create(post);
  }

  async updatePost(id: string, post: IPostUpdate): Promise<IPost | null> {
    return await PostModel.findByIdAndUpdate(id, post, { new: true }).lean();
  }

  async deletePost(id: string): Promise<IPost | null> {
    return await PostModel.findByIdAndDelete(id).lean();
  }
}

export { PostDao };
