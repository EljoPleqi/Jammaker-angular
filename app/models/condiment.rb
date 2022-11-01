class Condiment < ApplicationRecord
  require "open-uri"
  belongs_to :user
  has_many :instructions, dependent: :destroy
  has_many :ingredients, dependent: :destroy
  has_many :recipes, through: :flavour_enhancers
  def self.scrapper(condiment)
      @condiment = condiment
      html_content = URI.open(@condiment.url).read
      doc = Nokogiri::HTML(html_content)
      @title = doc.search('.article-heading').text.strip
      @ingredients = doc.search('.mntl-structured-ingredients__list').text.strip
      @steps = doc.search('.recipe__steps-content').text.strip

      if doc.search('.primary-image__image').present?
        @image = doc.search('.primary-image__image').attribute("src").value
      else
        @image = doc.search('video').attribute('poster').value
      end
      @category = doc.search('.mntl-breadcrumbs__item')[2].text.strip
      p "----------"
      p @title
      @condiment.title = @title
      @condiment.bulk_ingredients = @ingredients
      @condiment.steps = @steps.gsub(/\s\s\s*/,'-$')
      @condiment.url = @image
      @condiment.category = @category
      @condiment
  end
end
