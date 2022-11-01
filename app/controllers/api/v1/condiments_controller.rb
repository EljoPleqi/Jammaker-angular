class Api::V1::CondimentsController < ApplicationController
  def create
    @condiment = Condiment.create(raw_ingredients: condiment_params[:ingredients])
    create_instructions_ingredients(@condiment)
    render json: @condiment
  end

  def show
    @condiment = Condiment.find(params[:id])
    render json: @condiment
  end

  def update
    @condiment = Condiment.find(params[:id])
  end

  def destroy
    @condiment = Condiment.find(params[:id])
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
    params.require(:recipeData).permit(:preptime, :category, :genre, :image, :servings, :title, :favorite, :id, :instructions, :ingredients)
  end
end
