class Ingredient < ApplicationRecord
  belongs_to :recipe
  belongs_to :condiment

  def self.parse(ingredients)
    @ingredients = []
    ingredients.split("-$").each do |ingredient|
      @ingredients << ingredient
    end
    @ingredients
  end
end
