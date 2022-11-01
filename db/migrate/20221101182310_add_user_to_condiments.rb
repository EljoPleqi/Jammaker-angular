class AddUserToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_reference :condiments, :user, null: false, foreign_key: true
  end
end
