import { Router } from 'express';
import { autoInjectable } from 'tsyringe';

import { PostController } from '../controllers/post.controller';
import { createPostValidator, getPostValidator } from '../middleware/validation/post.validator';

@autoInjectable()
class PostRoute {
  public path = '/posts';
  public router = Router();
  constructor(private readonly postController: PostController) {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.route(`${this.path}`).get(this.postController.listPosts).post(createPostValidator, this.postController.createPost);
    this.router.route(`${this.path}/:id`).get(getPostValidator, this.postController.getPost);
    // .put(this.postController.updatePost).delete(this.postController.deletePost);
  }
}

export { PostRoute };
