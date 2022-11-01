class Api::V1::CondimentsController < ApplicationController
  def create
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @condiment = Condiment.new(condiment_params)
    @condiment = Condiment.scrapper(@condiment)
    @condiment.user = @current_user
    @condiment.save
    p  @condiment.save
    @instructions = Instruction.parse(@condiment.steps)
    @instructions.shift
    @instructions.each do |instruction|
      instruction.gsub!(/\A\s\d*\s*/, "")
      Instruction.create(content: instruction, condiment_id: @condiment.id)
    end
    @ingredients = Ingredient.parse(@condiment.bulk_ingredients.gsub(/ [0-9\u00BC-\u00BE\u2150-\u215E\u2189]+/) { |match| "-$#{match}" })
    @ingredients.each do |ingredient|
      Ingredient.create(content: ingredient, condiment_id: @condiment.id)
    end
    p "-----------------"
    p @condiment.ingredients
    p @condiment.instructions
     p "-----------------"

    render json: @condiment
  end

  def show
    @condiment = Condiment.find(params[:id])
    render json: {recipe: @condiment}
  end

  def update
    @condiment = Condiment.find(params[:id])
  end

  def destroy
    @condiment = Condiment.find(params[:id])
  end

  def typed_condiment
    @condiment = Condiment.create(raw_ingredients: condiment_params[:ingredients])
    create_instructions_ingredients(@condiment)
    render json: @condiment
  end
  private



  def create_instructions_ingredients(condiment)

    @instructions = condiment_params[:instructions]
    p  condiment_params
    @instructions.each do |instruction|
      puts instruction
      Instruction.create(content: instruction, condiment_id: condiment.id)
    end
    @ingredients = Ingredient.parse(@condiment.raw_ingredients)
    @ingredients.each do |ingredient|
      Ingredient.create(content: ingredient, condiment_id: condiment.id)
    end
  end

   def condiment_params
   params.require(:data).permit(:url,
                                :recipe_id,
                                :image,
                                :favorite,
                                :ingredients,
                                :instructions,
                                :title,
                                :category)
  end
end
