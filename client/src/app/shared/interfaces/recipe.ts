import { Instruction } from "./instruction";
export interface Recipe {
  id: Number,
  title: string;
  preptime: string;
  instructions: Instruction[];
  tags?: any;
  ingredients: string;
  url: string;
  steps: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  favorite: boolean;
  category: string;
  genre: string;

}
