class StaticController < ApplicationController
  def home
    render json: {status: "we are here"}
  end
end
