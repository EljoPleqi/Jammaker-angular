import { Condiment, Recipe } from './recipe.model';
import { User } from './user';

export interface UserResponse {
  status: string;
  logged_in: boolean;
  user: User;
  recipes: Recipe[];
  condiments: Condiment[];
}
