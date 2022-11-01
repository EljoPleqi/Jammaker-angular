class AddBulkIngredientsToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :bulk_ingredients, :string
  end
end
