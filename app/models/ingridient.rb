class Ingridient < ApplicationRecord
  belongs_to :recipe

  def self.parse(ingredients)
    @ingredients=[]
    ingredients.split(/\w\s\d/).each do |ingredient|
      @ingredients << ingredient.strip
    end
    @ingredients
  end
end
