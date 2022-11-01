class RenameRawIngredientsToTitle < ActiveRecord::Migration[7.0]
  def change
    rename_column :condiments, :raw_ingredients, :title
  end
end
