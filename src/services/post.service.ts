import { autoInjectable } from 'tsyringe';

import { PostDao } from '../DB/dao/post.dao';
import { IPost } from '../interfaces/post.interface';

@autoInjectable()
class PostService {
  constructor(private readonly postDao: PostDao) {}

  public getPost = async (id: string): Promise<IPost | null> => {
    return await this.postDao.findById(id);
  };
}

export { PostService };
