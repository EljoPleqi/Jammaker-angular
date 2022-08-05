class CorrectIngredientsName < ActiveRecord::Migration[7.0]
  def change
    rename_table :ingridients, :ingredients
  end
end
