class Ingredient < ApplicationRecord
  belongs_to :recipe

  def self.parse(ingredients)
    @ingredients = []
    ingredients.split("-$").each do |ingredient|
      @ingredients << ingredient
    end
    @ingredients
  end
end
