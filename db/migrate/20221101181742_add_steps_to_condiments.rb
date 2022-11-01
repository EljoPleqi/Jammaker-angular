class AddStepsToCondiments < ActiveRecord::Migration[7.0]
  def change
    add_column :condiments, :steps, :string
  end
end
