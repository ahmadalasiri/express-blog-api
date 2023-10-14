import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { autoInjectable } from 'tsyringe';

import HttpException from '../exceptions/HttpException';
import { PostService } from '../services/post.service';

@autoInjectable()
class PostController {
  constructor(private readonly postService: PostService) {}

  public getPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let post = await this.postService.getPost(req.params.id);
    if (!post) return next(new HttpException(404, 'No post found'));
    res.status(200).json({ data: post });
  });
}

export { PostController };
