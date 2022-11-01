class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    if params[:id]
      @user = User.find(params[:id])
      user = @user.as_json(except: %i[access_token refresh_token])
      session[:id] = params[:id]
      @recipes = Recipe.where(user_id: @user["id"])
      @condiments = Condiment.where(user_id:  @user["id"])

      response.headers['access_token'] = @user[:access_token].to_s
      render json: {
        status: 'created',
        logged_in: true,
        user:,
        recipes: @recipes.reverse,
        condiments: @condiments
      }
    else
      render json: {
        status: 401
      }
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end
end
