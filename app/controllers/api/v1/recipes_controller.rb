class Api::V1::RecipesController < ApplicationController
  # require 'rest-client'
  include CurrentUserConcern

  def index
    @recipes = Recipe.all
  end

  def create
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @recipe = Recipe.new(recipes_params)
    @recipe = Recipe.scraper(@recipe)
    @recipe.user = @current_user
    @recipe.save
    @instructions = Instruction.parse(@recipe.steps)
    @instructions.pop
    @instructions.each do |instruction|
      instruction.gsub!(/\A\s\d*\s*/, "")
      Instruction.create(content: instruction, recipe_id: @recipe.id)
    end
    @ingredients = Ingredient.parse(@recipe.bulk_ingredients.gsub(/ [0-9\u00BC-\u00BE\u2150-\u215E\u2189]+/) { |match| "-$#{match}" })
    @ingredients.each do |ingredient|
      Ingredient.create(content: ingredient, recipe_id: @recipe.id)
    end

    create_playlist(@recipe)


    render json: {
      id: @recipe.id,
      playlistId: @recipe.playlist["spotify_playlist_id"]
    }
  end

  def typed_recipe
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @recipe = Recipe.new({ genre: recipes_params[:genre], title: recipes_params[:title],
                           preptime: recipes_params[:prepTime], category: recipes_params[:category] })
    @recipe.user = @current_user
    @recipe.save
    create_instructions_ingredients(@recipe)
    create_playlist(@recipe)
    render json: {
      id: @recipe.id,
      playlistId: @recipe.playlist["spotify_playlist_id"]
    }
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: {
      recipe: @recipe,
      playlist: @recipe.playlist["spotify_playlist_id"]
    } # * send the recipe data sa json to the frontend
  end

  def generate_new_playlist
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @recipe = Recipe.find(params[:recipe_id])
    Playlist.where(recipe_id: @recipe).destroy_all
    create_playlist(@recipe)
    render json: {
      playlistId: @recipe.playlist["spotify_playlist_id"]
    }
  end

  def update
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @recipe = Recipe.find(params[:id])
    @recipe.update(favorite: params[:state])
    render json: @recipe
  end

  def destroy
    @current_user = User.find_by(id: session[:id]) if session[:id]
    @recipe = Recipe.find(params[:id])
    @recipe.destroy

    render json: { status: 'success' }
  end

  private

  def create_instructions_ingredients(recipe)
    @instructions = recipe_params[:instructions]
    @instructions.each do |instruction|
      puts instruction
      Instruction.create(content: instruction, recipe_id: recipe.id)
    end
    @ingredients = Ingredient.parse(@recipe.raw_ingredients)
    @ingredients.each do |ingredient|
      Ingredient.create(content: ingredient, recipe_id: condiment.id)
    end
  end

  def create_playlist(recipe)
    recipe.playlist = Playlist.create({
                                        spotify_playlist_id: create_spotify_playlist(recipe),
                                        recipe_id: recipe.id
                                      })
  end

  # * the #create_spotify_playlist takes two paraments the spotify user and the prep_time from the scrapper
  # * the #create_spotify_playlist generates and populates the user recipe

  def create_spotify_playlist(recipe)
    hdrs = return_header
    # * currate the songs array, it must hold either tracks or a collection of strings that is a valid spotify track uri
    songs = curate_playlist(recipe)
    # * CREATE THE PLAYLIST
    payload = {
      name: "Jammaker #{recipe.title}",
      description: "An automated playlist generated by jammaker.lol so that you dont ever have to fiddle with your music while cooking ever again",
      public: false
    }
    playlist = JSON.parse(RestClient.post("https://api.spotify.com/v1/users/#{@current_user.spotify_id}/playlists", payload.to_json, hdrs))
    send_playlist(playlist, songs)
  end

  def fetch_genre_url(genre)
    # * get the categories
    "https://api.spotify.com/v1/browse/categories/0JQ5DAqbMKFEC4WFtoNRpw"
  end

  def fetch_playlist_response(recipe)
    hdrs = return_header
    # * get the playlist url from the category
    playlist_response = fetch_genre_url(recipe.genre)
    if RestClient::Request.new({
                                 url: "#{playlist_response}/playlists",
                                 method: "GET",
                                 headers: hdrs
                               }).execute.code == 404
      playlist_response = fetch_genre_url(recipe)
    end
    JSON.parse(RestClient.get("#{playlist_response}/playlists", hdrs))
  end

  def fetch_song(recipe)
    hdrs = return_header
    playlist_response = fetch_playlist_response(recipe)
    playlist_url = playlist_response['playlists']['items'][rand(playlist_response.length) - 1]['href']
    # * get the song url from the playlist
    total_songs = JSON.parse(RestClient.get("#{playlist_url}/tracks?", hdrs))
    song_response = JSON.parse(RestClient.get("#{playlist_url}/tracks?&limit=1&offset=#{rand(total_songs['total'])}", hdrs))
    [song_response['items'].first['track']['uri'], song_response['items'].first['track']['duration_ms']] # * <---- return song
  end

  def curate_playlist(recipe)
    # * currate the songs array, it must hold either tracks or a collection of strings that is a valid spotify track uri
    songs = []
    playlist_time = 0
    # * looping until the total playlist time reaches the total preptime
    until playlist_time >= recipe.preptime.to_i
      song = fetch_song(recipe)
      puts "playlist time: #{playlist_time} prep time: #{recipe.preptime}"

      next if songs.include?(song[0])

      songs.push(song[0])
      playlist_time += song[1] / 60_000
    end
    songs
  end

  def send_playlist(playlist, songs)
    hdrs = return_header
    RestClient.post("https://api.spotify.com/v1/playlists/#{playlist['id']}/tracks?uris=#{songs.join(',')}", {}, hdrs)
    p "line 176"
    playlist["id"]
  end

  def return_header
    enc_credentials = "Bearer #{@current_user.access_token}"
    { "Accept" => "application/json",
      "Content-Type" => "application/json",
      "Authorization" => enc_credentials }
  end

  def recipes_params
    params.require(:data).permit(:url, :genre, :recipe_id, :tags,
                                 :image, :servings, :favorite,
                                 :ingredients, :instructions, :prepTime,
                                 :title, :category)
  end
end
