class AddIngredientsAndInstructionToCondiment < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :ingredients, :string
    add_column :condiments, :instructions, :string
  end
end
