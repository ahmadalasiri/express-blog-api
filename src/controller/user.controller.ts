import { Request, Response } from 'express';

import User from '../model/User.mode';

class UserController {
  public createUser = async (req: Request, res: Response) => {
    let user = await User.create(req.body);
    res.status(201).json({ user });
  };

  public getUsers = async (_: Request, res: Response) => {
    let user = await User.find();
    if (!user) res.send(404).json({ message: 'No users found' });
    res.status(200).json({ user });
  };

  public getUser = async (req: Request, res: Response) => {
    let user = await User.findById(req.params.id);
    if (!user) res.send(404).json({ message: 'No user found' });
    res.status(200).json({ user });
  };

  public updateUser = async (req: Request, res: Response) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) res.send(404).json({ message: 'No user found' });
    res.status(200).json({ user });
  };

  public deleteUser = async (req: Request, res: Response) => {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.send(404).json({ message: 'No user found' });
    res.status(200).json({ user });
  };
}

export default UserController;
