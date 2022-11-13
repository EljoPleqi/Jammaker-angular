class AddFavoriteToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :favorite, :boolean, default: false
  end
end
