class AddReferencesToCondiment < ActiveRecord::Migration[7.0]
  def change
    add_reference :instructions, :condiment, null: false, foreign_key: true
    add_reference :ingredients, :condiment, null: false, foreign_key: true
    add_reference :flavour_enhancers, :condiment, null: false, foreign_key: true
    add_reference :flavour_enhancers, :recipe, null: false, foreign_key: true
  end
end
