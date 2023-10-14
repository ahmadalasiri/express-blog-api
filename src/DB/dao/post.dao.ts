import { IPost } from '../../interfaces/post.interface';
import PostModel from '../models/post.model';

class PostDao {
  async findById(id: string): Promise<IPost | null> {
    return await PostModel.findById(id).lean();
  }
}

export { PostDao };
