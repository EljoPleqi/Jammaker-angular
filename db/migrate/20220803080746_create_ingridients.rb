class CreateIngridients < ActiveRecord::Migration[7.0]
  def change
    create_table :ingridients do |t|
      t.string :content
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
