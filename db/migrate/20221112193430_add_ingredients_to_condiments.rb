class AddIngredientsToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :ingredients, :string
  end
end
