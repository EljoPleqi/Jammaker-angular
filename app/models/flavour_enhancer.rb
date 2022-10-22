class FlavourEnhancer < ApplicationRecord
  belongs_to :recipe
  belongs_to :condiment
end
