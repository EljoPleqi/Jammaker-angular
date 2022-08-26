class RenameIngredients < ActiveRecord::Migration[7.0]
  def change
    rename_column :recipes, :ingredients, :raw_ingredients
  end
end
