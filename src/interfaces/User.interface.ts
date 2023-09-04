export interface IUser {
  _id?: string
  name: string;
  username: string;
  email: string;
  password: string;
  profilePicture: Object;
  bio: string;
  role: string;
  active: boolean;
}
