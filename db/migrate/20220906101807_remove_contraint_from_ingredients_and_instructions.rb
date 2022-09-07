class RemoveContraintFromIngredientsAndInstructions < ActiveRecord::Migration[7.0]
  def change
    change_column_null :ingredients, :recipe_id, true
    change_column_null :ingredients, :condiment_id, true
    change_column_null :instructions, :condiment_id, true
    change_column_null :instructions, :recipe_id, true
  end
end
