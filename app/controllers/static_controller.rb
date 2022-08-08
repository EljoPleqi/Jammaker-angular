class StaticController < ApplicationController
  def home
    render json: { status: "Welcom to the jammaker API" }
  end
end
