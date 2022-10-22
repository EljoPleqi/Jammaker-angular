class RenameCondimentsIngredients < ActiveRecord::Migration[7.0]
  def change
    rename_column :condiments, :ingredients, :raw_ingredients
  end
end
