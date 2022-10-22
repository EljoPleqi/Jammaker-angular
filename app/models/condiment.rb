class Condiment < ApplicationRecord
  belongs_to :user
  has_many :instructions, dependent: :destroy
  has_many :ingredients, dependent: :destroy
  has_many :recipes, through: :flavour_enhancers
end
