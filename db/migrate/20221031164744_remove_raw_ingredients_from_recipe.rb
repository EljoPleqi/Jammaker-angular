class RemoveRawIngredientsFromRecipe < ActiveRecord::Migration[7.0]
  def change
    remove_column :recipes, :raw_ingredients, :string
  end
end
