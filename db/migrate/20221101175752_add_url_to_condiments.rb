class AddUrlToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :url, :string
  end
end
