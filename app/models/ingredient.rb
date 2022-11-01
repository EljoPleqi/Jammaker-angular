class Ingredient < ApplicationRecord
  def self.parse(ingredients)
    @ingredients = []
    ingredients.split("-$").each do |ingredient|
      @ingredients << ingredient
    end
    @ingredients
  end
end
