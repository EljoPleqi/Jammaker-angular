class AddFavoriteToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :favorite, :boolean, default: false
    add_column :recipes, :category, :string
    add_column :recipes, :genre, :string
  end
end
