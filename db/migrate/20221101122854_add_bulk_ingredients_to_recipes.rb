class AddBulkIngredientsToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :bulk_ingredients, :string
  end
end
