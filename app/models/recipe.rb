class Recipe < ApplicationRecord
  require "open-uri"
  belongs_to :user
  has_many :instructions, dependent: :destroy
  has_many :ingredients, dependent: :destroy
  has_many :condiments, through: :flavour_enhancers
  has_one :playlist, dependent: :destroy
  scope :favorited, -> { where(favorite: true) }
  validates :genre, inclusion: ["pop", 'punk', 'rock', 'hiphop', 'chill', "indie_alt"]

  def self.scraper(recipe)
    # 1. We get the HTML page content
    @recipe = recipe

    html_content = URI.open(@recipe.url).read

    # 2. We build a Nokogiri document from this file
    doc = Nokogiri::HTML(html_content)
    @items = doc.search('.mntl-recipe-details__item')
    @preptime = ""

    @items.each do |item|
      @preptime = item.text.strip if item.text.include?('Total')
    end

    p @preptime
    hour = @preptime.match(/(\d+) hr/)
    hour = hour[1].to_i * 60 if hour.present?
    min = @preptime.match(/(\d+) mins/)
    min = min.present? ? min[1].to_i : 0
    @url = @recipe.url
    @preptime = hour.present? ? hour + min : min
    @title = doc.search('.article-heading').text.strip
    @ingredients = doc.search('.mntl-structured-ingredients__list').text.strip

    @steps = doc.search('.recipe__steps-content').text.strip

    if doc.search('.primary-image__image').present?
      @image = doc.search('.primary-image__image').attribute("src").value
    else
      @image = doc.search('video').attribute('poster').value
    end
    @category = doc.search('.mntl-breadcrumbs__item')[2].text.strip
    @recipe.title = @title
    @recipe.preptime = @preptime
    @recipe.bulk_ingredients = @ingredients.gsub(/\s\s\s\s*/, '-$')
    @recipe.steps = @steps.gsub(/\s\s\s*/, '-$')
    @recipe.url = @image
    @recipe.category = @category
    @recipe
  end
end
