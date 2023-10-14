import { Router } from 'express';

import { PostController } from '../controllers/post.controller';

class PostRoute {
  public path = '/posts';
  public router = Router();
  constructor(private readonly postController: PostController) {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.route(`${this.path}:id`).get(this.postController.getPost);
    // .put(this.postController.updatePost).delete(this.postController.deletePost);
  }
}

export { PostRoute };
