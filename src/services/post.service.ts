import { autoInjectable } from 'tsyringe';

import { PostDao } from '../DB/dao/post.dao';
import HttpException from '../exceptions/HttpException';
import { IPost, IPostUpdate } from '../interfaces/post.interface';

@autoInjectable()
class PostService {
  constructor(private readonly postDao: PostDao) {}

  public getPosts = async (): Promise<IPost[] | null> => {
    return await this.postDao.listPosts();
  };

  public getPost = async (id: string): Promise<IPost | null> => {
    return await this.postDao.getPost(id);
  };

  public createPost = async (userId: string, post: IPost): Promise<IPost | null> => {
    post.author = userId as any;
    return await this.postDao.createPost(post);
  };

  public updatePost = async (id: string, post: IPostUpdate): Promise<IPost | null> => {
    let oldPost = await this.postDao.getPost(id);
    if (!oldPost) return null;
    if (oldPost?.author.toString() !== post.userId.toString()) throw new HttpException(403, 'You are not authorized to update this post');
    return await this.postDao.updatePost(id, post);
  };

  public deletePost = async (id: string, userId: string): Promise<IPost | null> => {
    let oldPost = await this.postDao.getPost(id);
    if (!oldPost) return null;
    if (oldPost?.author !== (userId as any)) throw new HttpException(403, 'You are not authorized to update this post');
    return await this.postDao.deletePost(id);
  };
}

export { PostService };
