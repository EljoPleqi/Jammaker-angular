class AddCategoryToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :category, :string
  end
end
