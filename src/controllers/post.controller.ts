import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { autoInjectable } from 'tsyringe';

import HttpException from '../exceptions/HttpException';
import { PostService } from '../services/post.service';

@autoInjectable()
class PostController {
  constructor(private readonly postService: PostService) {}

  public listPosts = asyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
    let posts = await this.postService.getPosts();
    res.status(200).json({ results: posts?.length, data: posts });
  });

  public getPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let post = await this.postService.getPost(req.params.id);
    if (!post) return next(new HttpException(404, 'No post found'));
    res.status(200).json({ data: post });
  });

  public createPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let post = await this.postService.createPost(req.body);
    res.status(201).json({ data: post });
  });
}

export { PostController };
