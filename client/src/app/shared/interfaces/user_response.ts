import { Recipe } from './recipe';
import { User } from './user';

export interface UserResponse {
  status: string;
  logged_in: boolean;
  user: User;
  recipes: Recipe[];
}
