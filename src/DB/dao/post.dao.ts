import { IPost } from '../../interfaces/post.interface';
import PostModel from '../models/post.model';

class PostDao {
  async getPost(id: string): Promise<IPost | null> {
    return await PostModel.findById(id).lean();
  }
  async listPosts(): Promise<IPost[] | null> {
    return await PostModel.find().lean();
  }

  async createPost(post: IPost): Promise<IPost | null> {
    return await PostModel.create(post);
  }
}

export { PostDao };
