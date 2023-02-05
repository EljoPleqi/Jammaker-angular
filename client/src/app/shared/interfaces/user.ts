import { Recipe, Condiment } from './recipe.model';

export interface User {
  id: number;
  name: string;
  image: string;
  country: string;
  spotify_url: string;
  href: string;
  uri: string;
  spotify_id: string;
}

export interface UserResponse {
  status: string;
  logged_in: boolean;
  user: User;
  recipes: Recipe[];
  condiments: Condiment[];
}
