class CreateFlavourEnhancers < ActiveRecord::Migration[7.0]
  def change
    create_table :flavour_enhancers do |t|

      t.timestamps
    end
  end
end
